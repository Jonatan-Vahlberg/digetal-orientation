import { Polygon } from '@react-google-maps/api'
import React from 'react'
import defaultOptions from './defaultOptions'

type PolygonNodeProps = {
  node: PolygonNodeType
  setSelectedNode: React.Dispatch<
    React.SetStateAction<CircleNodeType | PolygonNodeType>
  >
}

const PolygonNode: React.FC<PolygonNodeProps> = ({ node, setSelectedNode }) => {
  const { vertices, information } = node
  return (
    <Polygon
      paths={vertices}
      options={{ ...defaultOptions }}
      onClick={information ? () => setSelectedNode(node) : undefined}
    />
  )
}

export default PolygonNode
