
import React, { useState } from 'react';
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

// Register Chart.js components
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
    const [weather, setWeather] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [message, setMessage] = useState("");

    // Fetch weather information using Axios
    async function getWeather() {

        if (city == "") {
            alert("Please enter city name");
            return;
        }

        setMessage("Loading weather information...");
        setWeather(null);
        setChartData(null);

        const key = "YOUR_API_KEY";

        try {

            // Get city coordinates
            const geoURL =
                "https://api.openweathermap.org/geo/1.0/direct?q="
                + encodeURIComponent(city)
                + "&limit=1&appid=" + key;

            const geoResponse = await axios.get(geoURL);

            const geoData = geoResponse.data;

            if (geoData.length == 0) {
                throw new Error("City not found");
            }

            var lat = geoData[0].lat;
            var lon = geoData[0].lon;


            // Get current weather
            const currentURL =
                "https://api.openweathermap.org/data/2.5/weather?lat="
                + lat + "&lon=" + lon
                + "&appid=" + key + "&units=metric";

            const currentResponse = await axios.get(currentURL);

            const currentData = currentResponse.data;

            setWeather(currentData);


            // Get historical weather for previous 5 days
            var labels = [];
            var temperatures = [];

            for (var i = 5; i >= 1; i--) {

                var date = new Date();

                date.setDate(date.getDate() - i);

                var timestamp = Math.floor(date.getTime() / 1000);

                const historyURL =
                    "https://api.openweathermap.org/data/3.0/onecall/timemachine?lat="
                    + lat + "&lon=" + lon
                    + "&dt=" + timestamp
                    + "&appid=" + key
                    + "&units=metric";

                const historyResponse = await axios.get(historyURL);

                const historyData = historyResponse.data;

                labels.push(date.toLocaleDateString());

                temperatures.push(historyData.data[0].temp);

            }


            // Chart data
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

            setMessage("");

        }

        catch(error) {

            setMessage(
                error.response?.data?.message || error.message
            );

        }

    }


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
