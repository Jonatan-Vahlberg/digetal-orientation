type User = {
  uuid: string
  firstName: string
  lastName: string

  routes: UserRoute[]
}

type UserRoute = {
  uuid: string
  title: string
  stepsClear: number[]
  finished: boolean
  started: string //timestamp
  ended?: string //timestamp
}
