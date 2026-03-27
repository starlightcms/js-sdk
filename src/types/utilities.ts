import { RepeaterGroup } from './groups'
import { Get, Paths } from 'type-fest'

/**
 * Returns the type of the group or field in the given structure at the
 * specified path. Use dot notation `.` to access items inside groups
 * and bracket notation `[]` to access items inside repeaters.
 *
 * Syntax example:
 *   - foo
 *   - foo.bar
 *   - foo.bar[0].baz
 *   - foo.bar[0].baz.quo
 *
 * This utility is useful to get the type of a deeply nested group or field
 * inside a Model, Singleton or Form structure.
 *
 * @example Retrieving the type of a deeply nested group or field.
 * ```ts
 * import { Group, StringField, GetFromStructure } from '@starlightcms/js-sdk'
 *
 * type ComplexModel = {
 *   info: Group<{
 *     title: StringField
 *     meta: Group<{
 *       keywords: StringField
 *       tags: RepeaterGroup<{
 *         name: StringField
 *       }>
 *     }>
 *   }>
 * }
 *
 * type MetaGroupType = GetFromStructure<ComplexModel, 'info.meta'>
 * // Resulting type -> Group<{ keywords: StringField, tags: RepeaterGroup<{ name: StringField }> }>
 *
 * type KeywordsFieldType = GetFromStructure<ComplexModel, 'info.meta.keywords'>
 * // Resulting type -> StringField
 *
 * type TagNameFieldType = GetFromStructure<ComplexModel, 'info.meta.tags[0].name'>
 * // Resulting type -> StringField
 * ```
 *
 * @group Utility Types
 */
export type GetFromStructure<
  Structure,
  Path extends Paths<
    Structure,
    { bracketNotation: true; maxRecursionDepth: 4 }
  >,
> = Get<Structure, Path>

/**
 * Returns the item type of the given Repeater Group.
 *
 * This utility is useful to get the type of the content
 * held in items of a specific Repeater Group.
 *
 * @example Retrieving the type of a repeater item.
 * ```ts
 * import {
 *  RepeaterGroup,
 *  MediaField,
 *  StringField,
 *  GetRepeaterItem,
 *  GetFromStructure
 * } from '@starlightcms/js-sdk'
 *
 * type SlideshowModel = {
 *   slides: RepeaterGroup<{
 *     image: MediaField
 *     description: StringField
 *   }>
 * }
 *
 * type Slide = GetRepeaterItem<SlideshowModel['slides']>
 * // Resulting type -> { image: MediaField, description: StringField }
 *
 * // Also works with the GetFromStructure utility
 * type Slide = GetRepeaterItem<GetFromStructure<SlideshowModel, 'slides'>>
 * // Resulting type -> { image: MediaField, description: StringField }
 * ```
 *
 * @group Utility Types
 */
export type GetRepeaterItem<
  Repeater extends RepeaterGroup<Record<string, unknown>>,
> = Repeater extends readonly (infer ItemType)[] ? ItemType : never
