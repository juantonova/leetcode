import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../models/errors";
import { ratings } from "../mocks/rating";
import { Rating } from "../models/rating";

class RatingController {
     
    private findRatingById = (id: string) => {
        return ratings.filter(rate => rate.id === Number(id));
    }

    private countRating = (rating: Rating[]) => {
        return Math.round(rating.reduce((acc, rate) => acc + rate.rating, 0) / rating.length);
    }

    private createRating = (rating: Omit<Rating, 'id'>): Rating => {
        return {
            id: ratings.length + 1,
            ...rating
        };
    }

    getRatingByTaskId = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { task_id }= req.params || {};
            if (!task_id) throw new BadRequestError('Task id is required')
    
            const allRating = this.findRatingById(task_id);
            if (!allRating.length) throw new NotFoundError('Rating not found');
            const rating = this.countRating(allRating);
            res.json({ rating });
        } catch (error) {
            next(error)
        }
    }

    addRating  = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { rating, user_id, task_id } = req.body || {};
            if (!rating || !user_id || !task_id) throw new BadRequestError('Invalid request')
        
            const newRating = this.createRating({ rating, user_id, task_id });

            const newCommonRating = this.countRating([...ratings, newRating]);
            res.json({ rating: newCommonRating });
            } catch (error) {
               next(error)
            }
        }
}

export default new RatingController();