
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import './App.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function App() {

    const [city, setCity] = useState("");
    const [search, setSearch] = useState(0);
    const [weather, setWeather] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [message, setMessage] = useState("");

    function getWeather() {

        if (city.trim() === "") {
            alert("Please enter city name");
            return;
        }

        setSearch(search + 1);
    }

    useEffect(() => {

        if (search === 0) {
            return;
        }

        setMessage("Loading weather information...");
        setWeather(null);
        setChartData(null);

        const key = "YOUR_API_KEY";

        // Get city coordinates
        const geoURL =
            "https://api.openweathermap.org/geo/1.0/direct?q="
            + encodeURIComponent(city)
            + "&limit=1&appid=" + key;

        axios.get(geoURL)

            .then(response => {

                const geoData = response.data;

                if (geoData.length === 0) {
                    throw new Error("City not found");
                }

                const lat = geoData[0].lat;
                const lon = geoData[0].lon;

                // Get current weather
                const currentURL =
                    "https://api.openweathermap.org/data/2.5/weather?lat="
                    + lat + "&lon=" + lon
                    + "&appid=" + key + "&units=metric";

                return axios.get(currentURL);

            })

            .then(response => {

                setWeather(response.data);

                const lat = response.data.coord.lat;
                const lon = response.data.coord.lon;

                let labels = [];
                let temperatures = [];
                let requests = [];

                // Get previous 5 days weather
                for (let i = 5; i >= 1; i--) {

                    let date = new Date();
                    date.setDate(date.getDate() - i);

                    let timestamp =
                        Math.floor(date.getTime() / 1000);

                    const historyURL =
                        "https://api.openweathermap.org/data/3.0/onecall/timemachine?lat="
                        + lat + "&lon=" + lon
                        + "&dt=" + timestamp
                        + "&appid=" + key
                        + "&units=metric";

                    labels.push(date.toLocaleDateString());

                    requests.push(axios.get(historyURL));

                }

                // Get all historical responses
                return axios.all(requests).then(responses => {

                    responses.forEach(response => {
                        temperatures.push(response.data.data[0].temp);
                    });

                    setChartData({

                        labels: labels,

                        datasets: [
                            {
                                label: "Temperature (°C)",
                                data: temperatures,
                                borderColor: "blue",
                                backgroundColor: "lightblue",
                                tension: 0.3
                            }
                        ]

                    });

                });

            })

            .then(() => {
                setMessage("");
            })

            .catch(error => {

                setMessage(
                    error.response?.data?.message || error.message
                );

            });

    }, [search]);

    return (

        <div className="container">

            <h1>Weather Information</h1>

            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            <button onClick={getWeather}>
                Get Weather
            </button>

            <p>{message}</p>

            {weather && (

                <div>

                    <h2>{weather.name}</h2>

                    <h3>
                        Temperature: {weather.main.temp} °C
                    </h3>

                    <p>
                        Weather: {weather.weather[0].description}
                    </p>

                    <p>
                        Humidity: {weather.main.humidity}%
                    </p>

                    <p>
                        Wind Speed: {weather.wind.speed} m/s
                    </p>

                </div>

            )}

            {chartData && (

                <div className="chart">

                    <h2>Historical Temperature</h2>

                    <Line data={chartData} />

                </div>

            )}

        </div>

    );

}

export default App;
