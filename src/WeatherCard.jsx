import "./WeatherCard.css";
export default function WeatherCard({ weather }) {
  const { location, current } = weather;
  return (
    <div className="weather-card">
      <div className="weather-header">
        <div>
          <h2>{location.name}</h2>
          <p>
            {location.region}, {location.country}
          </p>
        </div>
      </div>
      <div className="weather-main">
        <img
          src={`https:${current.condition.icon}`}
          alt={current.condition.text}
        />
        <div>
          <h1>{current.temp_c}°C</h1> <p>{current.condition.text}</p>
        </div>
      </div>
      <div className="weather-details">
        <div>
          <span>Feels like</span> <strong>{current.feelslike_c}°C</strong>
        </div>
        <div>
          <span>Humidity</span> <strong>{current.humidity}%</strong>
        </div>
        <div>
          <span>Wind</span> <strong>{current.wind_kph} km/h</strong>
        </div>
      </div>
    </div>
  );
}
