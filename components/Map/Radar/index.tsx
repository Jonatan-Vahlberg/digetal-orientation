import React, { useEffect, useState } from 'react'

const Radar: React.FC<{ distance: number }> = ({ distance }) => {
  const [duration, setDuration] = useState(distance)

  useEffect(() => {
    if (distance >= 300) {
      setDuration(4)
    } else if (distance >= 100) {
      setDuration(3)
    } else if (distance >= 50) {
      setDuration(2)
    } else if (distance >= 25) {
      setDuration(1)
    } else {
      setDuration(0)
    }
  }, [distance])
  return (
    <div className="border-white border-8 w-4/5">
      <div
        style={{ paddingTop: '100%' }}
        className=" bg-black relative overflow-hidden"
      >
        <RadarCircle
          duration={duration}
          delay={1}
          width="w-3/12"
          height="h-1/4"
        />
        <RadarCircle
          duration={duration}
          delay={2}
          width="w-6/12"
          height="h-2/4"
        />
        <RadarCircle
          duration={duration}
          delay={3}
          width="w-9/12"
          height="h-3/4"
        />
        {/* <RadarCircle
          duration={duration}
          delay={2}
          width="w-3/12"
          height="h-1/4"
        />
        <RadarCircle
          duration={duration}
          delay={3}
          width="w-6/12"
          height="h-2/4"
        />
        <RadarCircle
          duration={duration}
          delay={1}
          width="w-9/12"
          height="h-3/4"
        /> */}
      </div>
    </div>
  )
}

const RadarCircle: React.FC<{
  width: string
  height: string
  delay: number
  duration: number
}> = ({ width, height, delay, duration }) => {
  return (
    <div
      className={`absolute inset-center rounded-full border-4 border-green-800 ${width} ${height} animate-radar-circle ${
        delay ? `animate-delay-${delay}` : ''
      } ${delay ? `animate-duration-${duration}` : ''}`}
    />
  )
}
export default Radar
