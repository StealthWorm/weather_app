export type dailyInfo = {
  timeStamp: number,
  iconCode: number,
  maxTemp: number,
  minTemp: number,
  sunsetTime: number,
  sunriseTime: number,
}

export type hourlyInfo = {
  timeStamp: number,
  iconCode: number,
  temp: number,
  feelsLike: number,
  windSpeed: number,
  precip: number,
}

export type currentLocation = {
  latitude: number,
  longitude: number,
  timezone: string,
}

export type currentData = {
  highTemp: number,
  lowTemp: number,
  highFeelsLike: number,
  lowFeelsLike: number,
  windSpeed: number,
  precip: number,
  iconCode: number,
  isDay: boolean,
  sunriseTime: number,
  sunsetTime: number,
  currentTemp: number,
}