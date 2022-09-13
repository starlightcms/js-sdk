/**
 * All supported block types.
 *
 * @group Visual Data Blocks
 * @internal
 */
export type BlockType =
  | 'paragraph'
  | 'quote'
  | 'header'
  | 'image'
  | 'raw'
  | 'list'

/**
 * Base interface for types that represent block data.
 *
 * @group Visual Data Blocks
 */
export interface BlockData {
  [key: string]: unknown
}

/**
 * Represents a Paragraph block, which is the default block type used
 * for text content in the Visual Editor.
 *
 * @group Visual Data Blocks
 */
export interface ParagraphBlock extends BlockData {
  text: string
}

/**
 * Represents a Header block, which is used to render h1 through h6 HTML elements.
 *
 * @group Visual Data Blocks
 */
export interface HeaderBlock extends BlockData {
  text: string
  level: number
}

/**
 * Represents a Quote block, which is used to render a blockquote HTML element.
 *
 * @group Visual Data Blocks
 */
export interface QuoteBlock extends BlockData {
  text: string
  caption: string
  alignment: 'left' | 'center'
}

/**
 * Represents an image file, used in Image blocks.
 *
 * @group Visual Data Blocks
 * @internal
 */
type ImageFile = {
  url: string
  width: number
}

/**
 * Represents an Image block, which is used to render img or picture HTML elements.
 *
 * @group Visual Data Blocks
 */
export interface ImageBlock extends BlockData {
  id: number
  url: string
  files: ImageFile[]
  caption?: string
  alt?: string
  href?: string
}

/**
 * Represents an HTML block, which is used to render custom HTML code. Mainly
 * used to place embeds or heavily customized content structures.
 *
 * @group Visual Data Blocks
 */
export interface HTMLBlock extends BlockData {
  html: string
}

/**
 * Represents a list item, which is used by List blocks.
 *
 * @group Visual Data Blocks
 * @internal
 */
interface ListItem {
  content: string
  items?: ListItem[]
}

/**
 * Represents a List block, which is used to render ol or ul HTML elements.
 *
 * @group Visual Data Blocks
 */
export interface ListBlock extends BlockData {
  style: 'ordered' | 'unordered'
  items: ListItem[]
}

/**
 * A VisualDataBlock object represents a piece of content. Each block has a
 * specific type and some data associated with it. For instance, a Paragraph
 * block has text data, an Image block has a file path and image metadata, etc.
 *
 * @group Visual Data Blocks
 */
export interface VisualDataBlock<D extends BlockData = BlockData> {
  id: string
  type: BlockType
  data: D
}

/**
 * VisualData represents content generated by Starlight using a "Visual Editor"
 * field. It's an object-based data representation made out of "blocks". Each
 * block has a type string and some data associated with it.
 *
 * @group Visual Data Blocks
 */
export interface VisualData {
  time?: number
  version?: string
  blocks: VisualDataBlock[]
}
