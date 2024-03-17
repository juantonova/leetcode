import { Categories } from "./consts/categories"
import { Tags } from "./consts/tags"

export type Task = {
    id: number,
    description: string,
    incoming_example:  unknown,
    outgoing_example: unknown,
    tags: Tags[],
    category: Categories,
    additional_info?: string[],
    score: number,
    title: string
}