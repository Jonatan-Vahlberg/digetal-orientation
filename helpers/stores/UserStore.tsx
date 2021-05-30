import { makeAutoObservable } from 'mobx'
import firebase from 'firebase/app'
import firebaseClient from '../../config/firebase'

const ROUTE_LOCATION = 'users'

class UserStore {
  user?: User
  userLoading: boolean = true

  constructor() {
    makeAutoObservable(this)
    firebaseClient()
  }

  setUser(user?: User) {
    this.user = user
    this.userLoading = false
  }

  async getUser(uid: string) {
    this.userLoading = true

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
          this.setUser(user)
        }
      })
      .catch(() => {})
  }

  async updateUser(data: any, onComplete: () => void) {
    firebase
      .database()
      .ref(`${ROUTE_LOCATION}/${this.user.uuid}`)
      .update(data, (error) => {
        if (error === null) {
          this.setUser({ ...this.user, ...data })
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
    this.updateUser({ routes }, onComplete)
  }

  getNextStep(id: string, length: number): [boolean, number] {
    const route = this.user?.routes.find(({ uuid }) => id === uuid)
    let fullClear = false
    if (!route || !route.stepsClear || route.stepsClear?.length === 0) {
      return [fullClear, 0]
    }
    const highestClearedStep = Math.max(...route.stepsClear)
    if (highestClearedStep >= length - 1) {
      fullClear = true
    }
    return [fullClear, highestClearedStep + 1]
  }

  markStepAsCompleted(routeId: string, step: Step, onComplete: () => void) {
    const route = this.user?.routes.find(({ uuid }) => routeId === uuid)
    const stepsClear = route?.stepsClear ?? []
    stepsClear.push(step.stepIndex)
    this.updateRoute({ ...route, stepsClear }, onComplete)
  }

  async updateRoute(route: UserRoute, onComplete: () => void) {
    const routeIndex = this.user?.routes.findIndex(
      (oldRoute) => oldRoute.uuid === route.uuid
    )
    let routes = [...this.user?.routes]
    routes[routeIndex] = route
    this.updateUser({ routes }, onComplete)
  }

  clearRoute(routeId: string, onComplete: VoidFunction = () => {}) {
    const route = this.user?.routes.find(({ uuid }) => routeId === uuid)
    this.updateRoute({ ...route, finished: true }, onComplete)
  }

  resetRoute(routeId: string, onComplete: VoidFunction = () => {}) {
    const route = this.user?.routes.find(({ uuid }) => routeId === uuid)
    if (route) {
      route.finished = false
      route.stepsClear = []
      route.started = new Date().toString()
      this.updateRoute(route, onComplete)
    }
  }

  findRoute(currentRoute: FullRoute): UserRoute | undefined {
    let route: UserRoute | undefined = undefined
    route = this.user?.routes.find((route) => route.uuid === currentRoute.uuid)
    return route
  }

  wipeData() {
    this.user = undefined
    this.userLoading = true
  }
}

export default UserStore
