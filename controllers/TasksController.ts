import { NextFunction, Request, Response } from "express";

import { tasks } from '../mocks/tasks';
import { BadRequestError, NotFoundError } from "../models/errors";
import { Task } from "../models/task";

class TasksController {

    private findTaskById = (id: string) => {
        return tasks.find(task => task.id === Number(id));
    }

    private deleteTaskById = (id: string) => {
        return tasks.filter(task => task.id !== Number(id));
    }

    private createTask = (newTaskData: Omit<Task, 'id'>) => {
        return {
            id: tasks.length + 1,
            ...newTaskData
        };
    }

    private updateTaskInfo = (task: Task, updatedTaskData: Partial<Task>) => {
        return { ...task, ...updatedTaskData };
    }
    
    getTasks = (req: Request, res: Response, next: NextFunction) => {
            try {
                res.json({ tasks });
            } catch(error) {
                next(error)
            }
    }

    getTaskById = (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id }= req.params || {};
                if (!id) throw new BadRequestError('Task id is required');
                const task = this.findTaskById(id);
                if (!task) throw new NotFoundError('Task not found');
                res.json({ task });
            } catch(error) {
                next(error)
            }
    }

    addTask = (req: Request, res: Response, next: NextFunction) => {
            try {
                const { description, incoming_example, outgoing_example, tags, category, additional_info, score, title } = req.body || {};
                if (!description || !incoming_example || !outgoing_example || !tags || !category || !additional_info || !score || !title) {
                    throw new BadRequestError('Invalid request');
                }
            
                const task = this.createTask({ description, incoming_example, outgoing_example, tags, category, additional_info, score, title });
                res.json({ task }); 
            } catch(error) {
                next(error);
            }
    }

    deleteTask = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params || {};
            if (!id) throw new BadRequestError('Task id is required');
            this.deleteTaskById(id);
            res.json({ task_id: id });
        } catch(error) {
            next(error)
        }
    }

    updateTask = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { task: updatedTask } = req.body || {};
            const { id } = req.params || {};
            if (!id) throw new BadRequestError('Task id is required');
            
            const task = this.findTaskById(id);
            if (!task) throw new NotFoundError('Task not found');
            const newTask = this.updateTaskInfo(task, updatedTask);
            res.json({ task: newTask });
        } catch (error) {
            next(error)
        }
    }

}

export default new TasksController();