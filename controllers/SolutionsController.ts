import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../models/errors";
import { solutions } from "../mocks/solutions";
import { Solution } from "../models/solution";


class SolutionsController {

    private findSolutionById = (id: string) => {
        return solutions.filter(solution => solution.id === Number(id));
    }
    
    
    private createSolution = (solution: Omit<Solution, 'id'>) => {
        return {
            id: solutions.length + 1,
            solution
        };
    }
    
    getSolutions = (req: Request, res: Response,  next: NextFunction) => {
        try {
            const { task_id }= req.params || {};
            if (!task_id) {
                throw new BadRequestError('Task id is required');
            }
        
            const solutions = this.findSolutionById(task_id);

            if (!solutions.length) {
                throw new NotFoundError('Solutions not found');
            }
            res.json({ solutions });
        } catch(error) {
            next(error);
        }
    }

    addSolution = (req: Request, res: Response, next: NextFunction) => {
        console.log('hello')
        try {
            const { solution, user_id, task_id } = req.body || {};

            if (!solution || !user_id || !task_id) {
                throw new BadRequestError('Invalid request');
            }
            
            const newSolution = this.createSolution({ solution, user_id, task_id });
            res.json({ solution: newSolution });
        } catch(error) {
            next(error);
        }
    }

}

export default new SolutionsController();