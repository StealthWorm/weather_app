export type dailyInfo = {
  timeStamp: number,
  iconCode: number,
  maxTemp: number,
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