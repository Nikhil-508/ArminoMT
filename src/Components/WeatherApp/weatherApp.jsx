import React, { useEffect, useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
  const api_key = process.env.REACT_APP_API_KEY;

  const [wicon, setWicon] = useState(cloud_icon);
  const [cityInput, setCityInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [cityWeather, setCityWeather] = useState({
    Delhi: null,
    Paris: null,
    Sydney: null,
    Moscow: null,
    Riyadh: null,
  });

  useEffect(() => {
    const cities = ['Delhi', 'Paris', 'Sydney', 'Moscow', 'Riyadh'];

    const fetchWeatherData = async () => {
      const newCityWeather = {};
      for (const city of cities) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            newCityWeather[city] = Math.floor(data.main.temp) + '°C';
          } else {
            newCityWeather[city] = 'N/A';
          }
        } catch (error) {
          newCityWeather[city] = 'N/A';
        }
      }
      setCityWeather(newCityWeather);
    };

    fetchWeatherData();
  }, [api_key]);

  const search = async () => {
    if (cityInput === '') {
      setErrorMessage('Please enter a valid city name');
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${api_key}`;
    try {
      let response = await fetch(url);
      if (!response.ok) {
        setErrorMessage(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      let data = await response.json();
      const humidity = document.getElementsByClassName('humidity-percent');
      const wind = document.getElementsByClassName('wind-rate');
      const temperature = document.getElementsByClassName('weather-temp');
      const location = document.getElementsByClassName('weather-location');

      humidity[0].innerHTML = data.main.humidity + ' %';
      wind[0].innerHTML = Math.floor(data.wind.speed) + ' Km/h';
      temperature[0].innerHTML = Math.floor(data.main.temp) + '°C';
      location[0].innerHTML = data.name;

      if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
        setWicon(clear_icon);
      } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
        setWicon(cloud_icon);
      } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
        setWicon(drizzle_icon);
      } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
        setWicon(rain_icon);
      } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
        setWicon(rain_icon);
      } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }

      setErrorMessage('');
    } catch (error) {
      setErrorMessage('An error occurred while fetching the weather data.');
    }
  };

  return (
    <div className=' text-center sm:text-left container w-[607px] h-[850px] mx-auto mt-[75px] rounded-[12px] bg-gradient-to-b from-[#29598f] to-[#2d4854]'>
      <div className='top-bar'>
        <input
          type='text'
          className='cityInput'
          placeholder='Search'
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              search();
            }
          }}
        />
        <div className='search-icon' onClick={() => search()}>
          <img src={search_icon} alt='img' />
        </div>
      </div>
      <div className='weather-image ml-50 mt-29 flex justify-center'>
        <img className='size-32' src={wicon} alt='' />
      </div>
      <div className='weather-temp'>24°c</div>
      <div className='weather-location'>London</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt='' className='icon' />
          <div className='data'>
            <div className='humidity-percent'>64</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} alt='' className='icon' />
          <div className='data'>
            <div className='wind-rate'>18 km/hr</div>
            <div className='text'>Wind speed</div>
          </div>
        </div>
      </div>
      <div className='  my-10 city-head'>
        <h1 className='flex justify-center py-10 font-bold text-2xl text-white'>Popular Destinations</h1>
        <div className=' text-xl cities flex items-center justify-center'>
          {Object.entries(cityWeather).map(([city, temp]) => (
            <div key={city} className='text-center mx-4'>
              <h3 className='text-white city-location'>{city}</h3>
              <p className='text-white city-weather'>{temp}</p>
            </div>
          ))}
        </div>
      </div>
      {errorMessage && (
        <div className='my-20 flex justify-center'>
          <p style={{ color: 'yellow', fontSize: '18px' }}>{errorMessage} !!!</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
