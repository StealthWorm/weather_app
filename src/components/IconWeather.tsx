import { CloudMoon, CloudLightning, CloudRain, CloudSun, Cloud, MoonStars, CloudFog, CloudSnow, Snowflake, Sun } from "phosphor-react"

type Props = {
  iconCode: number;
  size?: number;
  isNight?: boolean;
}

export default function IconWeather({ iconCode, size = 100, isNight = false }: Props) {

  function retrieveCurrentWeather() {
    if ([0, 1].includes(iconCode)) {
      return !isNight
        ? <Sun width={size} height={size} color="white" className={`object-contain bg-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] ${isNight && "animate-pulse"}`} />
        : <MoonStars width={size} height={size} color="white" className={`object-contain bg-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] ${isNight && "animate-pulse"}`} />
    }
    else if ([2].includes(iconCode)) {
      return !isNight
        ? <CloudSun width={size} height={size} color="white" className={`object-contain bg-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] ${isNight && "animate-pulse"}`} />
        : <CloudMoon width={size} height={size} color="white" className={`object-contain bg-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] ${isNight && "animate-pulse"}`} />
    }
    else if ([3].includes(iconCode)) {
      return <Cloud width={size} height={size} color="white" className={`object-contain bg-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] ${isNight && "animate-pulse"}`} />
    }
    else if ([45, 48].includes(iconCode)) {
      return <CloudFog width={size} height={size} color="white" className={`object-contain bg-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] ${isNight && "animate-pulse"}`} />
    }
    else if ([66, 67].includes(iconCode)) {
      return <CloudSnow width={size} height={size} color="white" className={`object-contain bg-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] ${isNight && "animate-pulse"}`} />
    }
    else if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(iconCode)) {
      return <CloudRain width={size} height={size} color="white" className={`object-contain bg-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] ${isNight && "animate-pulse"}`} />
    }
    else if ([71, 73, 75, 77, 85, 86].includes(iconCode)) {
      return <Snowflake width={size} height={size} color="white" className={`object-contain bg-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] ${isNight && "animate-pulse"}`} />
    }
    else if ([95, 96, 99].includes(iconCode)) {
      return <CloudLightning width={size} height={size} color="white" className={`object-contain bg-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] ${isNight && "animate-pulse"}`} />
    }
  }

  return (
    <>
      {retrieveCurrentWeather()}
    </>
  )
}