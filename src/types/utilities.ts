import { RepeaterGroup } from './groups'

/**
 * Returns the item type of the given Repeater Group.
 *
 * For instance, given a `RepeaterGroup<Foo>`, this utility would return
 * the `Foo` type. This is useful to "pick" the type of the content held
 * by items of a Repeater Group.
 *
 * @group Utility Types
 */
export type RepeaterItem<
  Repeater extends RepeaterGroup<Record<string, unknown>>,
> = Repeater extends readonly (infer ItemType)[] ? ItemType : never
