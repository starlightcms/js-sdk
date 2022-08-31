import { MediaObject, Relation } from './entities'
import { VisualData } from './visual'

export type BooleanField = boolean

export type HtmlField = string

export type MediaField = MediaObject

export type RelationField<T> = Relation<T>

export type StringField = string

export type TextField = string

export type VisualField = VisualData
