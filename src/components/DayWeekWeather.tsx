import { dailyInfo } from '../../typings';
import { motion } from 'framer-motion';
import IconWeather from "./IconWeather";

type Props = {
  dayInfo: dailyInfo;
}

export default function DayWeekWeather({ dayInfo }: Props) {
  const today = new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(new Date())
  const weekDay = new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(dayInfo.timeStamp)

  return (
    <motion.div
      initial={{ opacity: 0, }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={`p-4 flex flex-col space-y-2 font-RajdhaniLight tracking-widest md:tracking-[8px] text-slate-50 text-xs md:text-md rounded-lg items-center justify-center bg-gray-900/50 backdrop-blur-lg hover:brightness-150 transition-all duration-200 ${today === weekDay && "border-2 border-slate-50 before:absolute before:rounded-full before:-left-2 before:-top-2 before:w-5 before:h-5 before:bg-blue-500 before:drop-shadow-[0_0_10px_#6366f1]"}`}
    >
      <IconWeather iconCode={dayInfo.iconCode} size={34} />

      <div className="font-RajdhaniMedium text-center bg-transparent uppercase">{weekDay}</div>
      <div className="flex font-RajdhaniMedium text-center pl-3 bg-transparent relative">
        <div className="bg-transparent">{dayInfo.maxTemp}</div>
        <span className="font-RajdhaniMedium text-center bg-transparent">°</span>
      </div>
    </motion.div>
  )
}