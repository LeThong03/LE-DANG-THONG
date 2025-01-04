import { Router } from 'express';
import {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
} from '../controllers/task.controller';

const router = Router();

router.route('/')
    .post(createTask)
    .get(getTasks);

router.route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

export default router;