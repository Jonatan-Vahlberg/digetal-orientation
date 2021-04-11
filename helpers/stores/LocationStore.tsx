import { makeAutoObservable } from 'mobx'
import classifyPoint from 'robust-point-in-polygon'
import { caluclateDistance } from '../functions'

const polygon = [
  [59.2851255144915, 18.038505839647919],
  [59.28524470267394, 18.03881437387636],
  [59.284876176943975, 18.039348133470323],
  [59.284755617474765, 18.039026268388536],
]

class LocationStore {
  watchId?: number | NodeJS.Timeout
  coordinates: Vertex = { lat: 0, lng: 0 }
  falseCoordinates = [59.284893, 18.038732]

  constructor() {
    makeAutoObservable(this)
    this.watchPosition()
  }

  watchPosition() {
    console.log(typeof window)
    if (typeof window !== 'undefined' && !this.watchId) {
      if ('geolocation' in window.navigator) {
        // this.watchId = window.navigator.geolocation.watchPosition(
        //   ({ coords: { latitude: lat, longitude: lng } }) => {
        //     this.coordinates = {
        //       lat,
        //       lng,
        //     }
        //   }
        // )
        window.navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude: lat, longitude: lng } }) => {
            console.log('POSITION GOT')
            this.coordinates = {
              lat,
              lng,
            }
          }
        )
        this.watchId = setInterval(() => {
          window.navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude: lat, longitude: lng } }) => {
              console.log('POSITION GOT')
              this.coordinates = {
                lat,
                lng,
              }
            },
            (error) => console.warn('ERROR', error)
          )
        }, 5000)
      }
    }
  }

  clearWatch() {
    if (typeof window !== 'undefined' && this.watchId) {
      if ('geolocation' in window.navigator) {
        //@ts-ignore
        clearInterval(this.watchId)
      }
    }
  }

  setCoordinates(coordinates: Vertex) {
    this.coordinates = coordinates
  }

  isInPolygon() {
    const { lat, lng } = this.coordinates
    const isInside = classifyPoint(polygon, [lat, lng])
    // console.log('INSIDE', isInside);
    return isInside === -1 || isInside === 0
  }

  getDistance(destination: Vertex) {
    return Math.round(caluclateDistance(destination, this.coordinates))
  }
}

export default LocationStore

// 59.285008, 18.038853

// 59.284893, 18.038732
