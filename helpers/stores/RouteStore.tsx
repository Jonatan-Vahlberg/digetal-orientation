import { makeAutoObservable } from 'mobx'
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

  getRoute(routeId: string) {
    this.loading = true

    firebase
      .database()
      .ref(`routes/${routeId}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const route: FullRoute = snapshot.val()
          console.log('route', route)
          this.currentRoute = route
          this.loading = false
        } else {
          this.loading = false
        }
      })
      .catch((error) => {
        console.log('ERROR', error)
      })
  }
}

export default RouteStore
