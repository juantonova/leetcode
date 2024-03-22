import { NextFunction, Response, Request } from "express";
import { users } from "../mocks/users";
import { User } from "../models/user";
import { BadRequestError, NotFoundError } from "../models/errors";


class UsersController {

    private updateUserInfoForResponse = (user: User) => {
        const { id, name, rating, role, permissions } = user;
        return { id, name, rating, role, permissions };
    }

    private findUserById = (id: string) => {
        return users.find(user => user.id === Number(id));
    }

    private deleteUserById = (id: string) => {
        return users.filter(user => user.id !== Number(id));
    }

    private updateUserInfo = (user: User, rating: number) => {
        return  { ...user, rating };
    }

    getUsers = (req: Request, res: Response, next: NextFunction) =>{
        const usersForResponse = users.map(this.updateUserInfoForResponse)
        try {
            res.json({ users: usersForResponse });
        } catch (error) {
            next(error)
        }
    }

    getUserById = (req: Request, res: Response, next: NextFunction) => {
        try {
        const { id } = req.params || {};
        if (!id) throw new BadRequestError('Invalid request');
        const user = this.findUserById(id);
        if (!user) throw new NotFoundError('User not found');
        const userForResponse = this.updateUserInfoForResponse(user);
        res.json({ user: userForResponse });
        } catch (error) {
            next(error)
        }
    }

    deleteUser = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id }= req.params || {};
            if (!id) throw new BadRequestError('Invalid request');
            this.deleteUserById(id);
            res.json({  user_id: id });
        } catch (error) {
            next(error);
        }
    }

    updateUser = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { rating } = req.body || {};
            const { id } = req.params || {};
            if (!id) throw new BadRequestError('Invalid request');
        
            const user = this.findUserById(id);
            if (!user) throw new NotFoundError('User not found');
        
            const updatedUser = this.updateUserInfo(user, rating);
            const userForResponse = this.updateUserInfoForResponse(updatedUser);
            res.json({  user: userForResponse });   
        } catch(error) {
            next(error);
        }
    }
}

export default new UsersController();