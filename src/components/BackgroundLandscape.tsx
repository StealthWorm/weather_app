import { useCallback, useEffect, useMemo, useState } from 'react'

import { motion } from 'framer-motion';

import morning from '../assets/morning.jpg'
import afternoon from '../assets/afternoon.png'
import night from '../assets/night.jpg'

function BackgroundLandscape() {
  const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", hour12: false, minute: "numeric" }).format(new Date())
  const timeArray = time.split(":").map(Number)

  const [bkgImage, setBkgImage] = useState(morning)

  useEffect(() => {
    handleBackground(timeArray)
  }, [timeArray])

  function handleBackground(timeArray: Array<number>) {
    if (timeArray[0] > 0 && timeArray[0] < 12) {
      setBkgImage(morning)
    } else if (timeArray[0] > 12 && timeArray[0] < 18) {
      setBkgImage(afternoon)
    } else {
      setBkgImage(night)
    }
  }


  return (
    <motion.img
      src={bkgImage}
      className='absolute z-0 object-fill md:object-cover w-full top-0 h-[150%] md:h-[108%]'
      initial={{ y: -50, opacity: 0 }}
      transition={{ duration: 1.2 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      alt=''
    />
  )
}

export default BackgroundLandscape