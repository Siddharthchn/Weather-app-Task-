import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(''); 

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city || 'New Delhi'}&units=metric&appid=acc4d62f33e0833ca1db80b48aa7ce2f`);
      if (!response.ok) {
        throw new Error('No weather found.');
      }
      const data = await response.json();
      setWeatherData(data);
      fetchBackgroundImage(data.name); 
    } catch (error) {
      alert('No weather found.');
      console.error(error);
    }
  };

  const fetchBackgroundImage = (cityName) => {
    const encodedCityName = encodeURIComponent(cityName);
    let imageUrl;

    
    if (window.innerWidth <= 768) {
        imageUrl = `https://source.unsplash.com/600x900/?${encodedCityName}`;
    } else {
        imageUrl = `https://source.unsplash.com/1600x900/?${encodedCityName}`;
    }

    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = 'cover';
};


  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="card bg-black bg-opacity-80 text-white p-8 rounded-3xl w-[85%] lg:w-full max-w-md">
        <form onSubmit={handleSubmit} className='flex items-center justify-between'>
          <input
            type="text"
            className="bg-[#7c7c7c2b]  rounded-2xl px-4 py-2 mr-4 text-white w-[100%]"
            placeholder="Search"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="bg-gray-700 rounded-full p-2 hover:bg-gray-600">
            <IoSearch className='text-2xl'/>
          </button>
        </form>
        {weatherData && (
          <div className="weather mt-6">
            <h2 className="city lg:text-2xl text-xl font-semibold mb-3">Weather in {weatherData.name}</h2>
            <h1 className="temp text-4xl lg:text-5xl font-bold mb-3">{weatherData.main.temp}°C</h1>
            <div className="flex items-center">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt=""
                className="icon"
              />
              <div className="description text-lg ml-2">{weatherData.weather[0].description}</div>
            </div>
            <div className="humidity text-lg mt-3">Humidity: {weatherData.main.humidity}%</div>
            <div className="wind text-lg mt-1">Wind speed: {weatherData.wind.speed} km/h</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
