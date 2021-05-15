type FullRoute = {
  uuid: string
  title: string
  description: string
  availableFrom: string //timestamp
  type: 'ORIENTATION' | 'MIX'

  steps: Step[]
  emergancyContact?: {
    name: string
    phone: string
  }
}

type Step = {
  stepIndex: number
  title: string
  description?: string
  radar?: RadarData
  code?: CodeData
  markup?: StepMarkup
}

type StepMarkup = {
  visibleAlways?: string
  visibleWhenClose?: string
}

type CodeData = {
  showMap: boolean
  node: PolygonNodeType
  acceptCodeOutside: boolean
  code: string
}

type CoordData = {
  title?: string
  description?: string
  hints: Message[]
  coords: Coordinates
}

type RadarData = {
  hints: Message[]
  node: CircleNodeType
}
