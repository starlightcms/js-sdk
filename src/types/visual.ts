export type BlockType =
  | 'paragraph'
  | 'quote'
  | 'header'
  | 'image'
  | 'raw'
  | 'list'

export interface BlockData {
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

type ImageFile = {
  url: string
  width: number
}

export interface ImageBlock extends BlockData {
  id: number
  url: string
  files: ImageFile[]
  caption?: string
  alt?: string
  href?: string
}

export interface HTMLBlock extends BlockData {
  html: string
}

export interface ListItem {
  content: string
  items?: ListItem[]
}

export interface ListBlock extends BlockData {
  style: 'ordered' | 'unordered'
  items: ListItem[]
}

export interface VisualDataBlock<D extends BlockData = BlockData> {
  id: string
  type: BlockType
  data: D
}

export interface VisualData {
  time?: number
  version?: string
  blocks: VisualDataBlock[]
}
