import { body, param, query, ValidationChain } from 'express-validator';

export const taskValidationRules = {
    create: [
        body('title')
            .trim()
            .notEmpty()
            .withMessage('Title is required')
            .isLength({ min: 3, max: 100 })
            .withMessage('Title must be between 3 and 100 characters'),
        
        body('description')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('Description cannot exceed 500 characters'),
        
        body('status')
            .optional()
            .isIn(['pending', 'in-progress', 'completed'])
            .withMessage('Status must be pending, in-progress, or completed'),
        
        body('dueDate')
            .notEmpty()
            .withMessage('Due date is required')
            .isISO8601()
            .withMessage('Due date must be a valid date')
            .custom((value) => {
                if (new Date(value) < new Date()) {
                    throw new Error('Due date cannot be in the past');
                }
                return true;
            })
    ],

    update: [
        param('id')
            .isMongoId()
            .withMessage('Invalid task ID'),
            
        body('title')
            .optional()
            .trim()
            .isLength({ min: 3, max: 100 })
            .withMessage('Title must be between 3 and 100 characters'),
        
        body('description')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('Description cannot exceed 500 characters'),
        
        body('status')
            .optional()
            .isIn(['pending', 'in-progress', 'completed'])
            .withMessage('Status must be pending, in-progress, or completed'),
        
        body('dueDate')
            .optional()
            .isISO8601()
            .withMessage('Due date must be a valid date')
            .custom((value) => {
                if (new Date(value) < new Date()) {
                    throw new Error('Due date cannot be in the past');
                }
                return true;
            })
    ],

    delete: [
        param('id')
            .isMongoId()
            .withMessage('Invalid task ID')
    ],

    getOne: [
        param('id')
            .isMongoId()
            .withMessage('Invalid task ID')
    ],

    list: [
        query('status')
            .optional()
            .isIn(['pending', 'in-progress', 'completed'])
            .withMessage('Invalid status filter'),
        
        query('sortBy')
            .optional()
            .isIn(['createdAt', 'dueDate', 'title', '-createdAt', '-dueDate', '-title'])
            .withMessage('Invalid sort field')
    ]
};