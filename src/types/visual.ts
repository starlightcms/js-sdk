type BlockType = 'paragraph' | 'quote' | 'header' | 'image'

interface BlockData {
  [key: string]: unknown
}

export interface ParagraphBlock extends BlockData {
  text: string
}

export interface HeaderBlock extends BlockData {
  text: string
  level: number
}

export interface QuoteBlock extends BlockData {
  text: string
  caption: string
  alignment: 'left' | 'center'
}

export interface ImageBlock extends BlockData {
  url: string
}

export interface VisualDataBlock<D extends BlockData = BlockData> {
  type: BlockType
  data: D
}

export interface VisualData {
  time?: number
  version?: string
  blocks: VisualDataBlock[]
}
