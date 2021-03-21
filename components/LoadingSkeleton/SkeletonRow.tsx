import React from 'react'

interface SkeletonColumnProps {
  width: number
  height: number
  highlighted: boolean
  className?: string
  style?: object
}

const SkeletonRow: React.FC<SkeletonColumnProps> = ({
  width,
  height,
  highlighted,
  className,
  style,
}) => {
  const color = highlighted ? 'white' : 'white bg-opacity-25'
  return (
    <div
      className={`bg-${color} rounded-full mb-2 ${className}`}
      style={{ width: `${width}%`, height: `${height}px`, ...style }}
    />
  )
}

export default SkeletonRow
