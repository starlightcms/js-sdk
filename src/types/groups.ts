/**
 * Represents a Group returned by the API.
 *
 * Group types are used to type Entry and Singleton objects when requesting
 * them using some SDK methods. See {@apilink DefaultModelDefinition}
 * for more info.
 *
 * @group Data Groups
 */
export type Group<Fields extends Record<string, unknown>> = Fields

/**
 * Represents a Legacy Group returned by the API.
 *
 * Group types are used to type Entry and Singleton objects when requesting
 * them using some SDK methods. See {@apilink DefaultModelDefinition}
 * for more info.
 *
 * @group Data Groups
 */
export type LegacyGroup<Fields extends Record<string, unknown>> = Fields

/**
 * Represents a Repeater Group returned by the API.
 *
 * Note that the API return empty repeaters as `null`.
 *
 * To retrieve the type of a `RepeaterGroup` item, use the
 * {@apilink RepeaterItem} utility type.
 *
 * Group types are used to type Entry and Singleton objects when requesting
 * them using some SDK methods. See {@apilink DefaultModelDefinition}
 * for more info.
 *
 * @group Data Groups
 */
export type RepeaterGroup<Fields extends Record<string, unknown>> =
  | Fields[]
  | null
