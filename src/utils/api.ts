import axios from 'axios';
import { currentLocation } from '../../typings';

interface HourlyWeather {
  time: number[];
  weathercode: number[];
  temperature_2m: number[];
  apparent_temperature: number[];
  windspeed_10m: number[];
  precipitation: number[];
}

interface CurrentWeather {
  time: number;
}

export interface ParsedHourlyWeather {
  timeStamp: number;
  iconCode: number;
  temp: number;
  feelsLike: number;
  windSpeed: number;
  precip: number;
}

interface DailyWeather {
  time: number[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: number[];
  sunset: number[];
}

export interface ParsedDailyWeather {
  timeStamp: number;
  iconCode: number;
  maxTemp: number;
  minTemp: number;
  sunriseTime: number;
  sunsetTime: number;
}

interface CurrentWeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  is_day: boolean;
}

interface DailyWeatherData {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  precipitation_sum: number[];
  sunrise: number[];
  sunset: number[];
}

export interface ParsedCurrentWeather {
  currentTemp: number;
  highTemp: number;
  lowTemp: number;
  highFeelsLike: number;
  lowFeelsLike: number;
  windSpeed: number;
  precip: number;
  iconCode: number;
  isDay: boolean;
  sunriseTime: number;
  sunsetTime: number;
}

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

function parseCurrentWeather({ current_weather, daily }: { current_weather: CurrentWeatherData, daily: DailyWeatherData }): ParsedCurrentWeather {
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

function parseDailyWeather({ daily }: { daily: DailyWeather }): ParsedDailyWeather[] {
  return daily.time.map((time, index) => {
    return {
      timeStamp: time * 1000,
      iconCode: daily.weathercode[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
      minTemp: Math.round(daily.temperature_2m_min[index]),
      sunriseTime: daily.sunrise[index] * 1000,
      sunsetTime: daily.sunset[index] * 1000,
    }
  })
}

function parseHourlyWeather({ hourly, current_weather }: { hourly: HourlyWeather, current_weather: CurrentWeather }): ParsedHourlyWeather[] {
  return hourly.time.map((time: number, index: number) => {
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