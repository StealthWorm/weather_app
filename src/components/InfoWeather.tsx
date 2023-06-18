import { motion } from 'framer-motion'

type Props = {
  title: string;
  data: string;
}

export default function InfoWeather({ title, data }: Props) {

  return (
    <motion.div
      initial={{ opacity: 0, }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col items-center w-full bg-gray-900/50 backdrop-blur-lg rounded-md py-4"
    >
      <div className="bg-transparent uppercase">{title}</div>
      <div className="bg-transparent text-slate-50/60">{data}°</div>
    </motion.div>
  )
}