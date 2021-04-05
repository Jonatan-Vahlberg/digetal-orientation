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
  type: 'CODE' | 'COORDS' | 'RADAR' | 'LOCATION'
  stepData: CodeData | RadarData | CoordData
}

type CodeData = {
  title: string
  description: string
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
  title?: string
  description?: string
  hints: Message[]
  node: CircleNodeType
}
