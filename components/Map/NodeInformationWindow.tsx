import React, { useEffect, useState } from 'react'
import { InfoWindow } from '@react-google-maps/api'
import NodeInformationHint from './NodeInformationHint'
interface NodeInformationWindowProps {
  node: CircleNodeType | PolygonNodeType
  setSelectedNode: React.Dispatch<
    React.SetStateAction<PolygonNodeType | CircleNodeType>
  >
}

const NodeInformationWindow: React.FC<NodeInformationWindowProps> = ({
  node,
  setSelectedNode,
}) => {
  const [center, setCenter] = useState<Vertex>()
  const [openHints, setOpenHints] = useState<number[]>([])
  useEffect(() => {
    if (node.hasOwnProperty('vertices')) {
      const tempNode = node as PolygonNodeType
      setCenter(tempNode.vertices[0])
    } else {
      const tempNode = node as CircleNodeType
      setCenter(tempNode.pointOfOrigin)
    }
  }, [])
  return (
    <InfoWindow
      onCloseClick={() => setSelectedNode(undefined)}
      position={center}
    >
      <div className="w-75 text-black text-base">
        <p className="font-bold">{node.information?.title}</p>
        <p className="text-sm font-normal">{node.information?.description}</p>
        {node.information?.hints && (
          <div className="mt-3">
            {node.information.hints.map((hint, index) => (
              <NodeInformationHint
                key={`HINT FOR OPEN WINDOW ${index}`}
                hint={hint}
                index={index}
                setOpenHints={setOpenHints}
                openHints={openHints}
              />
            ))}
          </div>
        )}
      </div>
    </InfoWindow>
  )
}

export default NodeInformationWindow
