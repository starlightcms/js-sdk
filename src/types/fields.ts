import { MediaObject, Relation } from './entities'
import { VisualData } from './visual'

/**
 * Represents a Boolean Field returned by the API.
 *
 * Field types are used to type Entry and Singleton objects when requesting
 * them using some SDK methods. See {@apilink DefaultModelDefinition}
 * for more info.
 *
 * @group Data Fields
 */
export type BooleanField = boolean

/**
 * Represents a HTML Field returned by the API.
 *
 * Field types are used to type Entry and Singleton objects when requesting
 * them using some SDK methods. See {@apilink DefaultModelDefinition}
 * for more info.
 *
 * @group Data Fields
 */
export type HtmlField = string

/**
 * Represents a Media Field returned by the API.
 *
 * Field types are used to type Entry and Singleton objects when requesting
 * them using some SDK methods. See {@apilink DefaultModelDefinition}
 * for more info.
 *
 * @group Data Fields
 */
export type MediaField = MediaObject

/**
 * Represents a Relation Field returned by the API.
 *
 * Field types are used to type Entry and Singleton objects when requesting
 * them using some SDK methods. See {@apilink DefaultModelDefinition}
 * for more info.
 *
 * @group Data Fields
 */
export type RelationField<T> = Relation<T>

/**
 * Represents a String Field returned by the API.
 *
 * Field types are used to type Entry and Singleton objects when requesting
 * them using some SDK methods. See {@apilink DefaultModelDefinition}
 * for more info.
 *
 * @group Data Fields
 */
export type StringField = string

/**
 * Represents a Text Field returned by the API.
 *
 * Field types are used to type Entry and Singleton objects when requesting
 * them using some SDK methods. See {@apilink DefaultModelDefinition}
 * for more info.
 *
 * @group Data Fields
 */
export type TextField = string

/**
 * Represents a Visual Field returned by the API.
 *
 * Field types are used to type Entry and Singleton objects when requesting
 * them using some SDK methods. See {@apilink DefaultModelDefinition}
 * for more info.
 *
 * @group Data Fields
 */
export type VisualField = VisualData
