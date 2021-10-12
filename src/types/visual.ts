export interface Block<D = Record<string, unknown>> {
  type: string
  data: D
}

export interface VisualData {
  time?: number
  version?: string
  blocks: Block[]
}
