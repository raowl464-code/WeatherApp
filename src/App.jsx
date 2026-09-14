import { useState } from "react";
import "@fontsource/roboto/500.css";
import TextField from "@mui/material/TextField";
import "./App.css";
import WeatherCard from "./WeatherCard";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleClick = async () => {
    try {
      setWeather(null);
      const city = input.trim();
      if (city === "") {
        setError("Please enter a city");
        return;
      }
      setError("");
      const response = await fetch(
        "https://api.weatherapi.com/v1/current.json?key=" +
          import.meta.env.VITE_WEATHER_API_KEY +
          "&q=" +
          city +
          "&aqi=yes",
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      // Check if WeatherAPI itself returned an error
      if (data.error) {
        setWeather("");
        setError(data.error.message);
        return;
      }
      // Store weather data
      setWeather(data);
    } catch (err) {
      setError("Something went wrong. Try adding a valid city");
    }
  };

  return (
    <div className="main-card">
      <div className="container">
        <TextField
          id="outlined-basic"
          placeholder="Enter the city"
          variant="outlined"
          sx={{
            width: "300px",
            "& .MuiInputBase-root": {
              height: "37px",
            },
          }}
          onChange={(e) => {
            handleChange(e);
          }}
          onKeyDown={(e) => {
            e.key.toLowerCase() === "enter" && handleClick();
          }}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={() => {
            handleClick();
          }}
        >
          Search
        </Button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
