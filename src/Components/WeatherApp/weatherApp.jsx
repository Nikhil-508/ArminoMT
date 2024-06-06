import React, { useState } from 'react'
import './WeatherApp.css'


import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'

const WeatherApp = () => {

  const api_key = process.env.REACT_APP_API_KEY
  
  const [wicon,setWicon] = useState(cloud_icon)
  const [cityInput,setCityInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  const search = async () => {

    const element = document.getElementsByClassName("cityInput")
    if(element[0].value === "")
    {
      setErrorMessage("Please enter a valid city name");
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
try{
  let response = await fetch(url)

  if(!response.ok){
    setErrorMessage(`Error: ${response.status} - ${response.statusText}`);
    return
  }
  
    let data = await response.json();

    
    const humidity = document.getElementsByClassName("humidity-percent")
    const wind = document.getElementsByClassName("wind-rate")
    const temperature = document.getElementsByClassName("weather-temp")
    const location = document.getElementsByClassName("weather-location")
  
     humidity[0].innerHTML = data.main.humidity +" %"
     wind[0].innerHTML = Math.floor(data.wind.speed )+" Km/h"
     temperature[0].innerHTML = Math.floor(data.main.temp)+"°C"
     location[0].innerHTML = data.name 

     if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n" )
     {
      setWicon(clear_icon)
     }
     else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n")
     {
      setWicon(cloud_icon)
     }
     else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n")
     {
      setWicon(drizzle_icon)
     }
     else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n")
     {
      setWicon(drizzle_icon)
     }
     else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n")
     {
      setWicon(rain_icon)
     }
     else if(data.weather[0].icon === "010d" || data.weather[0].icon === "010n")
     {
      setWicon(rain_icon)
     }
     else if(data.weather[0].icon === "013d" || data.weather[0].icon === "013n")
     {
      setWicon(snow_icon)
     }
     else
     {
      setWicon(clear_icon)
     }

     setErrorMessage("")
    }catch(error){              
      setErrorMessage("An error occurred while fetching the weather data.")
    }

  }

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className="cityInput" placeholder='Search' value={cityInput} onChange={(e) => setCityInput(e.target.value)}
         onKeyDown={(e) => {
          if (e.key === 'Enter') {
            search();
          }
        }} />
        <div className="search-icon" onClick={()=>{search()}} >
          <img src= {search_icon} alt="img" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp text-3xl font-bold underline">24°c</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className='icon' />
          <div className="data">
            <div className="humidity-percent">64</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className='icon' />
          <div className="data">
            <div className="wind-rate">18 km/hr</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>  
      {errorMessage && (
          <div>
            <br />
            <p style={{color:'white'}}>{errorMessage}</p>
          </div>
        )}
    </div>
  )
}
<script src="https://kit.fontawesome.com/b2f61be1e9.js" crossorigin="anonymous"></script>

export default WeatherApp