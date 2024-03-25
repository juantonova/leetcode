import { Request, Response } from "express";
import { ErrorWithStatus } from "../models/errors";


const errorHandler = (err: ErrorWithStatus, req: Request, res: Response, next: () => void) => {
    const errStatus =  err.status || 500;
    const errMsg = err.message|| 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
    })
}

export default errorHandler;
