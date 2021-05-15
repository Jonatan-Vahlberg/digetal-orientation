import { Marker, GoogleMap } from '@react-google-maps/api'
import React from 'react'
interface UserMarkerProps {
  coordinates: Vertex
}

const UserMarker: React.FC<UserMarkerProps> = ({ coordinates }) => {
  return (
    <Marker position={coordinates} icon={{ url: '/images/marker_xs.svg' }} />
  )
}

export default UserMarker
