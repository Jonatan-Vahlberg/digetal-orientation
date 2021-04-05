import { makeAutoObservable } from 'mobx'
import firebase from 'firebase/app'
import firebaseClient from '../../config/firebase'

const ROUTE_LOCATION = 'users'

class UserStore {
  user?: User

  constructor() {
    makeAutoObservable(this)
    firebaseClient()
  }

  setUser(user?: User) {
    this.user = user
  }

  async getUser(uid: string) {
    firebase
      .database()
      .ref(`${ROUTE_LOCATION}/${uid}`)
      .get()
      .then((userSnapshot) => {
        if (userSnapshot.exists()) {
          const user: User = userSnapshot.val()
          if (!user.routes) {
            user.routes = []
          }
          this.user = user
        }
      })
      .catch(() => {})
  }

  async updateUser(uid: string, data: any, onComplete: () => void) {
    firebase
      .database()
      .ref(`${ROUTE_LOCATION}/${uid}`)
      .update(data, (error) => {
        if (error === null) {
          this.user = { ...this.user, ...data }
          onComplete()
        }
      })
  }

  async addRoute(uid: string, route: FullRoute, onComplete: () => void) {
    const newRoute: UserRoute = {
      title: route.title,
      uuid: route.uuid,
      stepsClear: [],
      finished: false,
      started: new Date().toString(),
    }
    const routes = [...this.user?.routes, newRoute]
    this.updateUser(uid, { routes }, onComplete)
  }

  async updateRoute(uid: string, route: UserRoute, onComplete: () => void) {
    const routeIndex = this.user?.routes.findIndex(
      (oldRoute) => oldRoute.uuid === route.uuid
    )
    let routes = [...this.user?.routes]
    routes[routeIndex] = route
    this.updateUser(uid, { routes }, onComplete)
  }

  findRoute(currentRoute: FullRoute): UserRoute | undefined {
    let route: UserRoute | undefined = undefined
    route = this.user?.routes.find((route) => route.uuid === currentRoute.uuid)
    return route
  }
}

export default UserStore
