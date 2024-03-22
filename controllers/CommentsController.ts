import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../models/errors";
import { comments } from "../mocks/comments";
import { Comment } from "../models/comment";

class CommentsController {

    private findCommentsByTaskId(id: string) {
        return comments.filter(comment => comment.task_id === Number(id));
    }

    private deleteCommentById(id: string) {
        return comments.filter(comment => comment.id !== Number(id));
    }

    private createComment(comment: Omit<Comment, 'id'>) {
        return {
            id: comments.length + 1,
            ...comment
        };
    }

    getComments(req: Request, res: Response, next: NextFunction) {
        try {
            const { task_id } = req.params || {};
            if (!task_id) throw new BadRequestError('Task id is required');
            const comments = this.findCommentsByTaskId(task_id);
            if (!comments.length) throw new NotFoundError('Comments not found');
            res.json({ comments });
        } catch (error) {
            next(error)
        }
    }

    addComment(req: Request, res: Response, next: NextFunction) {
        try {
            const { task_id, user_id, content, created_at } = req.body || {};
            if (!task_id || !user_id || !content || !created_at) {
                throw new BadRequestError('Invalid request');
            }
                const comment = this.createComment({ task_id, user_id, content, created_at });
                res.json({ comment });
            } catch (error) {
                next(error)
            }
    }

    deleteComment(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params || {};
            if (!id) throw new BadRequestError('Task id is required');
            this.deleteCommentById(id);
            res.json({ comment_id: id });
        } catch (error) {
            next(error)
        }
    }
        
}

export default new CommentsController();