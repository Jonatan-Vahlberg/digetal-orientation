import React from 'react'

const Radar: React.FC<{}> = () => {
  return (
    <div className="border-white border-8">
      <div
        style={{ paddingTop: '100%' }}
        className="w-full bg-black relative overflow-hidden"
      >
        <RadarCircle width="w-3/12" height="h-1/4" />
        <RadarCircle width="w-6/12" height="h-2/4" />
        <RadarCircle width="w-9/12" height="h-3/4" />
        <RadarCircle delayed width="w-3/12" height="h-1/4" />
        <RadarCircle delayed width="w-6/12" height="h-2/4" />
        <RadarCircle delayed width="w-9/12" height="h-3/4" />
      </div>
    </div>
  )
}

const RadarCircle: React.FC<{
  width: string
  height: string
  delayed?: boolean
}> = ({ width, height, delayed }) => {
  return (
    <div
      className={`absolute inset-center rounded-full border-8 border-green-700 ${width} ${height} ${
        delayed ? 'animate-radar-circle' : 'animate-radar-circle-delay-2'
      } `}
    />
  )
}
export default Radar
