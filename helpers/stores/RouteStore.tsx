import { computed, makeAutoObservable } from 'mobx'
import firebase from 'firebase/app'
import firebaseClient from '../../config/firebase'
import 'firebase/auth'

class RouteStore {
  currentRoute?: FullRoute
  loading: boolean = true

  constructor() {
    makeAutoObservable(this)
    firebaseClient()
  }

  getRoute(routeId: string, onRouteRecieved: () => void, onError: () => void) {
    this.loading = true

    firebase
      .database()
      .ref(`routes/${routeId}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const route: FullRoute = snapshot.val()
          this.setCurrentRoute(route)

          onRouteRecieved()
        } else {
          this.setCurrentRoute(undefined)
          onError()
        }
      })
      .catch((error) => {
        console.log('ERROR', error)
        onError()
      })
  }

  setCurrentRoute(route?: FullRoute) {
    this.currentRoute = route
    this.loading = false
  }

  getStep(stepIndex: number) {
    return this.currentRoute?.steps[stepIndex]
  }

  wipeData() {
    this.currentRoute = undefined
    this.loading = true
  }
}

export default RouteStore
