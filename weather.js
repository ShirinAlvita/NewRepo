import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

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
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  // Put your API key here
  const API_KEY = "cb375db859dc552487a4d03fab36d93e";
  const city = "Hyderabad";

  useEffect(() => {

    // -----------------------------
    // 1. CURRENT WEATHER
    // -----------------------------

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        console.log("Current Weather:", response.data);

        setWeather(response.data);
      })
      .catch((error) => {
        console.log(
          "Current Weather Error:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
          "Unable to fetch current weather"
        );
      });


    // -----------------------------
    // 2. FORECAST WEATHER
    // -----------------------------

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {

        console.log("Forecast Response:", response.data);

        const data = response.data.list.slice(0, 8);

        const result = data.map((item) => ({
          time: item.dt_txt,
          temperature: item.main.temp
        }));

        console.log("Chart Data:", result);

        setHistory(result);
      })
      .catch((error) => {

        console.log(
          "Forecast Error:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message ||
          "Unable to fetch forecast data"
        );
      });

  }, []);


  // -----------------------------
  // CHART DATA
  // -----------------------------

  const chartData = {
    labels: history.map((item) => item.time),

    datasets: [
      {
        label: "Temperature (°C)",

        data: history.map((item) => item.temperature),

        borderWidth: 3,

        pointRadius: 5,

        tension: 0.3
      }
    ]
  };


  // -----------------------------
  // CHART OPTIONS
  // -----------------------------

  const chartOptions = {
    responsive: true,

    plugins: {
      legend: {
        display: true
      },

      title: {
        display: true,
        text: "Hyderabad Weather Forecast"
      }
    },

    scales: {
      y: {
        beginAtZero: false,

        title: {
          display: true,
          text: "Temperature (°C)"
        }
      },

      x: {
        title: {
          display: true,
          text: "Date and Time"
        }
      }
    }
  };


  // -----------------------------
  // DISPLAY
  // -----------------------------

  return (
    <div
      style={{
        width: "80%",
        margin: "30px auto",
        fontFamily: "Arial"
      }}
    >

      <h1>Weather Information</h1>


      {/* ERROR MESSAGE */}

      {error && (
        <div
          style={{
            backgroundColor: "#ffe6e6",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid red"
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}


      {/* CURRENT WEATHER */}

      {weather ? (
        <div>

          <h2>{weather.name}</h2>

          <p>
            <strong>Temperature:</strong>{" "}
            {weather.main.temp} °C
          </p>

          <p>
            <strong>Feels Like:</strong>{" "}
            {weather.main.feels_like} °C
          </p>

          <p>
            <strong>Humidity:</strong>{" "}
            {weather.main.humidity} %
          </p>

          <p>
            <strong>Weather:</strong>{" "}
            {weather.weather[0].description}
          </p>

          <p>
            <strong>Wind Speed:</strong>{" "}
            {weather.wind.speed} m/s
          </p>

        </div>
      ) : (
        <p>Loading current weather...</p>
      )}


      {/* WEATHER GRAPH */}

      <h2>Weather Graph</h2>

      {history.length > 0 ? (
        <Line
          data={chartData}
          options={chartOptions}
        />
      ) : (
        <p>Loading weather graph...</p>
      )}

    </div>
  );
}

export default App;
