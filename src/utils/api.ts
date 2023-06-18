import axios from 'axios';
import { currentLocation } from '../../typings';

//&past_days=7
export async function getWeather({ latitude, longitude, timezone }: currentLocation) {
  return await axios.get("https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,is_day,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,sunrise,sunset,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum&current_weather=true&timeformat=unixtime", {
    params: {
      latitude: latitude,
      longitude: longitude,
      timezone: timezone
    }
  }).then(({ data }) => {
    return {
      current: parseCurrentWeather(data),
      daily: parseDailyWeather(data),
      hourly: parseHourlyWeather(data),
    }
  })
}

function parseCurrentWeather({ current_weather, daily }) {
  const { temperature: currentTemp, windspeed: windSpeed, weathercode: iconCode, is_day: isDay } = current_weather
  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
    apparent_temperature_max: [maxFeelsLike],
    apparent_temperature_min: [minFeelsLike],
    precipitation_sum: [precip],
    sunrise: sunrise, 
    sunset: sunset, 
  } = daily

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(maxTemp),
    lowTemp: Math.round(minTemp),
    highFeelsLike: Math.round(maxFeelsLike),
    lowFeelsLike: Math.round(minFeelsLike),
    windSpeed: Math.round(windSpeed),
    precip: Math.round(precip * 100) / 100,
    iconCode,
    isDay,
    sunriseTime: sunrise[0] * 1000, 
    sunsetTime: sunset[0] * 1000, 
  }
}

function parseDailyWeather({ daily }) {
  return daily.time.map((time, index) => {
    return {
      timeStamp: time * 1000,
      iconCode: daily.weathercode[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
      sunriseTime: daily.sunrise[index]  * 1000, 
      sunsetTime: daily.sunset[index]  * 1000, 
    }
  })
}

function parseHourlyWeather({ hourly, current_weather }) {
  return hourly.time.map((time, index) => {
    return {
      timeStamp: time * 1000,
      iconCode: hourly.weathercode[index],
      temp: Math.round(hourly.temperature_2m[index]),
      feelsLike: Math.round(hourly.apparent_temperature[index]),
      windSpeed: Math.round(hourly.windspeed_10m[index]),
      precip: Math.round(hourly.precipitation[index] * 100) / 100,
    }
  }).filter(({ timeStamp }) => timeStamp >= current_weather.time * 1000)
}