type Vertex = {
  lat: number
  lng: number
}

type NodeInformation = {
  title: string
  description?: string
  hints?: string[]
}

type PolygonNodeType = {
  vertices: Vertex[]
  information?: NodeInformation
}

type CircleNodeType = {
  pointOfOrigin: Vertex
  radius: number
  information?: NodeInformation
}
