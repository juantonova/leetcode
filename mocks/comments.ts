import { Comment } from "../models/comment";

export const comments: Comment[] = [
    {
        id: 1,
        user_id: 1,
        task_id: 1,
        content: "I'm done",
        created_at: "2021-07-19T00:00:00.000Z"
    },
    {
        id: 2,
        user_id: 2,
        task_id: 1,
        content: "Me too",
        created_at: "2022-07-19T00:00:00.000Z"
    },
    {
        id: 3,
        user_id: 2,
        task_id: 2,
        content: "Can you help me with this one?",
        created_at: "2022-07-19T00:00:00.000Z"
    },
    {
        id: 4,
        user_id: 1,
        task_id: 2,
        content: "Sure, I can help you",
        created_at: "2022-07-20T00:00:00.000Z"
    },
]
