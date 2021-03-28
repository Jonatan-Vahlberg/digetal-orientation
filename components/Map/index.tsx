import { observer } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader, Polygon } from '@react-google-maps/api'
import { useLocationStore } from '~/helpers/stores'
import { paperStyle } from '~/config/mapStyle'
import CircleNode from './CircleNode'
import NodeInformationWindow from './NodeInformationWindow'
interface BaseProps {
  visibleNodes: any[]
  userLocation: UserCoordinates
}

const options = {
  styles: paperStyle,
}

const Map: React.FC<{ visibleNodes: any[] }> = ({ visibleNodes }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  })
  const [map, setMap] = useState<any>(null)
  const [selectedNode, setSelectedNode] = useState<
    CircleNodeType | PolygonNodeType
  >()
  const onLoad = useCallback((map: any) => {
    setMap(map)
  }, [])
  const onUnmount = useCallback((map: any) => {
    setMap(null)
  }, [])
  const locationStore = useLocationStore()
  const { coordinates } = locationStore
  console.log(coordinates)
  return (
    isLoaded && (
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={{ lat: coordinates[0], lng: coordinates[1] }}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
      >
        <CircleNode
          node={{
            pointOfOrigin: { lat: coordinates[0], lng: coordinates[1] },
            radius: 5,
            information: {
              title: 'No Comment',
            },
          }}
          setSelectedNode={setSelectedNode}
        />
        <CircleNode
          node={{
            pointOfOrigin: {
              lat: coordinates[0] + 0.00078,
              lng: coordinates[1],
            },
            radius: 5,
            information: {
              title: 'Brevid Fotbolls planen',
              description: 'Nära västra hörnet',
              hints: ['Kolla Kartan :^|', '...Really'],
            },
          }}
          setSelectedNode={setSelectedNode}
        />
        {selectedNode && (
          <NodeInformationWindow
            node={selectedNode}
            setSelectedNode={setSelectedNode}
          />
        )}
      </GoogleMap>
    )
  )
}
export default observer(Map)
