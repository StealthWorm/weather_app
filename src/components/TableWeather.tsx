import { hourlyInfo } from "../../typings";
import IconWeather from "./IconWeather";

type Props = {
  hourInfo: hourlyInfo[];
}

export default function TableWeather({ hourInfo }: Props) {
  return (
    <div className="flex overflow-y-auto max-h-[10rem] z-10 border border-slate-400 backdrop-blur-lg rounded-lg overflow-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-100/80 bg-transparent">
      <table className="table-auto w-full max-h-[3rem] border-collapse tracking-wider overflow-y-auto text-center uppercase md:text-xl text-xs bg-transparent">
        <tbody className="[&>*:nth-child(even)]:bg-gray-900/60 [&>*:nth-child(odd)]:bg-gray-900/30 bg-transparent text-slate-100">
          {hourInfo.map((hour) => (
            <tr key={hour.timeStamp} className="font-RajdhaniSemiBold bg-transparent border-b border-slate-100/10 hover:brightness-150 transition-all duration-200">
              <td className="bg-transparent justify-center py-2">
                <div className="bg-transparent">
                  <div className="text-[9px] md:text-sm bg-transparent">{new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(hour.timeStamp)}, dia {new Intl.DateTimeFormat(undefined, { day: "numeric" }).format(hour.timeStamp)}</div>
                  <div className="bg-transparent">{new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "numeric" }).format(hour.timeStamp)}</div>
                </div>
              </td>
              <td className="bg-transparent">
                <IconWeather iconCode={hour.iconCode} size={36} />
              </td>
              <td className="justify-center bg-transparent">
                <div className="bg-transparent">
                  <div className="text-[9px] md:text-sm bg-transparent">Temperature</div>
                  <div className='bg-transparent'>{hour.temp}°</div>
                </div>
              </td>
              <td className="justify-center bg-transparent">
                <div className="bg-transparent">
                  <div className="text-[9px] md:text-sm bg-transparent">FL Temp</div>
                  <div className='bg-transparent'>{hour.feelsLike}°</div>
                </div>
              </td>
              <td className="justify-center bg-transparent">
                <div className="bg-transparent">
                  <div className="text-[9px] md:text-sm bg-transparent">Wind</div>
                  <div className='bg-transparent'>{hour.windSpeed} Km/h</div>
                </div>
              </td>
              <td className="justify-center bg-transparent">
                <div className="bg-transparent">
                  <div className="text-[9px] md:text-sm bg-transparent">Precip</div>
                  <div className='bg-transparent font-bold'>{hour.precip} ml</div>
                </div>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  )
}