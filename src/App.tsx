import './styles/global.css';
import { useEffect, useState } from 'react'

import { ParsedCurrentWeather, getWeather } from "./utils/api";

import InfoWeather from './components/InfoWeather'
import DayWeekWeather from './components/DayWeekWeather';
import IconWeather from './components/IconWeather';
import BackgroundLandscape from './components/BackgroundLandscape';
import TableWeather from './components/TableWeather';
import { SunHorizon } from 'phosphor-react';
import { currentData, dailyInfo, hourlyInfo } from '../typings';

function App() {
  const [currentData, setCurrentData] = useState<currentData>()
  const [dailyData, setDailyData] = useState<dailyInfo[]>([])
  const [hourlyData, setHourlyData] = useState<hourlyInfo[]>([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError)
  })

  function positionSuccess({ coords }: GeolocationPosition) {
    getWeather({ latitude: coords.latitude, longitude: coords.longitude, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
      .then(renderWeather)
      .catch(e => {
        console.error(e)
        alert("Error fetching data")
      })
  }

  function positionError() {
    alert("Error getting your current location. Please allow us to get your position and refresh the page.")
  }

  function renderWeather({ current, daily, hourly }: { current: ParsedCurrentWeather, daily: dailyInfo[], hourly: hourlyInfo[] }) {
    setCurrentData(current)
    setDailyData(daily)
    setHourlyData(hourly)
    // console.log(dailyData)
  }

  return (
    <>
      <BackgroundLandscape />

      <div className="flex m-4 flex-col md:space-y-12 space-y-8">
        {currentData &&
          <header className="flex z-10 md:flex-row w-full justify-between md:space-y-0 md:space-x-6 flex-col md:flex-auto space-y-6 bg-transparent">
            <div className="flex items-center justify-evenly text-slate-50 w-full rounded-md bg-gray-900/50 p-6 space-x-6 backdrop-blur-lg">
              <div className="bg-transparent flex items-center space-x-4 h-full w-full justify-center">
                <IconWeather iconCode={currentData.iconCode} isNight={!currentData.isDay} />
                <span className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] tracking-[8px] text-slate-50 font-RajdhaniBold text-6xl bg-transparent">{currentData.currentTemp}°</span>
              </div>

              <div className='flex flex-col relative bg-transparent font-RajdhaniMedium space-y-3 h-full justify-center w-full'>
                <div className="flex flex-col bg-transparent items-end justify-center" title="Sunrise">
                  <SunHorizon width={50} height={50} color="#fcd34d" className='bg-transparent drop-shadow-[0_0_10px_#fde68a]' />
                  <span className="bg-transparent text-center text-xl px-1">{new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "numeric" }).format(currentData.sunriseTime)}</span>
                </div>
                <div className='flex flex-col bg-transparent items-end justify-center' title="Sunset">
                  <SunHorizon width={50} height={50} color="#fdba74" className='bg-transparent drop-shadow-[0_0_10px_#fed7aa]' />
                  <span className="bg-transparent text-center text-xl px-1">{new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "numeric" }).format(currentData.sunsetTime)}</span>
                </div>
              </div>
            </div>

            <div className="w-full uppercase grid grid-rows-2 grid-flow-col gap-4 text-3xl items-center text-slate-50 font-RajdhaniMedium bg-transparent">
              <InfoWeather title="HIGH" data={currentData.highTemp} />
              <InfoWeather title="LOW" data={currentData.lowTemp} />
              <InfoWeather title="FL HIGH" data={currentData.highFeelsLike} />
              <InfoWeather title="FL LOW" data={currentData.lowFeelsLike} />
              <InfoWeather title="WIND" data={currentData.windSpeed} />
              <InfoWeather title="PREC" data={currentData.precip} />
            </div>
          </header>
        }

        {dailyData &&
          <section className="grid gap-4 grid-auto-columns grid-cols-3 md:grid-cols-4 mx-auto z-10 bg-transparent">
            {dailyData.map((day, i) => (
              <DayWeekWeather key={i} dayInfo={day} />
            ))
            }
          </section>
        }
        {hourlyData &&
          <TableWeather hourInfo={hourlyData} />
        }
      </div>

    </>
  )
}

export default App
