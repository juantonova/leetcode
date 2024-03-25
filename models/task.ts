import { CategoryType } from "./enums/categories"
import { Tag } from "./enums/tags"

export type Task = {
    id: number
    description: string
    incoming_example:  unknown
    outgoing_example: unknown
    tags: Tag[]
    category: CategoryType
    additional_info?: string[]
    score: number
    title: string
}