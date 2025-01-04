import { Request, Response } from 'express';
import Task, { ITask } from '../models/task.model';
import { AppError } from '../middleware/error-handler';

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task: ITask = await Task.create(req.body);
        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred'
        });
    }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const { status, sortBy } = req.query;
        let query = Task.find();

        // Apply filters
        if (status) {
            query = query.where('status', status);
        }

        // Apply sorting
        if (sortBy) {
            query = query.sort(sortBy.toString());
        }

        const tasks: ITask[] = await query.exec();
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred'
        });
    }
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task: ITask | null = await Task.findById(req.params.id);
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error: any) {
        const statusCode = error instanceof AppError ? error.statusCode : 400;
        res.status(statusCode).json({
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred'
        });
    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task: ITask | null = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error: any) {
        const statusCode = error instanceof AppError ? error.statusCode : 400;
        res.status(statusCode).json({
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred'
        });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error: any) {
        const statusCode = error instanceof AppError ? error.statusCode : 400;
        res.status(statusCode).json({
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred'
        });
    }
};