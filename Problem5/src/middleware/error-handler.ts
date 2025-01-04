import { Request, Response, NextFunction } from 'express';
import { ValidationError as ExpressValidationError } from 'express-validator';
import mongoose from 'mongoose';

export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

interface MongoError extends Error {
    code?: number;
    keyValue?: { [key: string]: any };
}

export const errorHandler = (
    err: Error | AppError | mongoose.Error | MongoError | ExpressValidationError[],
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let errorResponse = {
        success: false as const,
        error: {
            message: 'Something went wrong!',
            code: 500 as number
        }
    };

    // Log error for debugging
    console.error('Error:', err);

    // Mongoose validation error
    if (err instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(err.errors).map(val => val.message);
        errorResponse.error.message = `Invalid input data. ${messages.join('. ')}`;
        errorResponse.error.code = 400;
    }

    // Mongoose duplicate key error
    else if ((err as MongoError).code === 11000) {
        const keyValue = (err as MongoError).keyValue;
        const value = keyValue ? Object.values(keyValue)[0] : 'duplicate value';
        errorResponse.error.message = `Duplicate field value: ${value}. Please use another value!`;
        errorResponse.error.code = 400;
    }

    // Mongoose CastError (invalid ObjectId)
    else if (err instanceof mongoose.Error.CastError) {
        errorResponse.error.message = `Invalid ${err.path}: ${err.value}`;
        errorResponse.error.code = 400;
    }

    // Express Validator errors
    else if (Array.isArray(err) && err.length > 0 && 'msg' in err[0]) {
        const messages = err.map(e => e.msg);
        errorResponse.error.message = `Validation failed. ${messages.join('. ')}`;
        errorResponse.error.code = 400;
    }

    // Custom AppError
    else if (err instanceof AppError) {
        errorResponse.error.message = err.message;
        errorResponse.error.code = err.statusCode;
    }

    // Generic Error with message
    else if (err instanceof Error) {
        errorResponse.error.message = err.message;
        errorResponse.error.code = 500;
    }

    res.status(errorResponse.error.code).json(errorResponse);
};