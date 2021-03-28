import { Circle } from '@react-google-maps/api'
import React from 'react'
import defaultOptions from './defaultOptions'

type CircleNodeProps = {
  node: CircleNodeType
  setSelectedNode: React.Dispatch<
    React.SetStateAction<CircleNodeType | PolygonNodeType>
  >
}

const CircleNode: React.FC<CircleNodeProps> = ({ node, setSelectedNode }) => {
  const { pointOfOrigin, radius, information } = node
  return (
    <Circle
      radius={radius}
      center={pointOfOrigin}
      options={{ ...defaultOptions, radius: radius }}
      onClick={information ? () => setSelectedNode(node) : undefined}
    />
  )
}

export default CircleNode
