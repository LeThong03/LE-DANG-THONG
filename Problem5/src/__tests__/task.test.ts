import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';
import Task from '../models/task.model';

const testTask = {
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow
};

beforeAll(async () => {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/problem5-test-db';
    await mongoose.connect(MONGODB_URI);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

beforeEach(async () => {
    await Task.deleteMany({});
});

describe('Task API', () => {
    describe('POST /api/tasks', () => {
        it('should create a new task', async () => {
            const res = await request(app)
                .post('/api/tasks')
                .send(testTask);

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.title).toBe(testTask.title);
        });

        it('should fail to create task without required fields', async () => {
            const res = await request(app)
                .post('/api/tasks')
                .send({});

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });

    describe('GET /api/tasks', () => {
        it('should get all tasks', async () => {
            await Task.create(testTask);

            const res = await request(app).get('/api/tasks');

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBe(1);
        });

        it('should filter tasks by status', async () => {
            await Task.create(testTask);
            await Task.create({ ...testTask, status: 'completed' });

            const res = await request(app)
                .get('/api/tasks')
                .query({ status: 'pending' });

            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(1);
            expect(res.body.data[0].status).toBe('pending');
        });
    });

    describe('GET /api/tasks/:id', () => {
        it('should get task by id', async () => {
            const task = await Task.create(testTask);

            const res = await request(app).get(`/api/tasks/${task._id}`);

            expect(res.status).toBe(200);
            expect(res.body.data._id).toBe(task.id.toString());
        });

        it('should return 404 for non-existent task', async () => {
            const res = await request(app)
                .get(`/api/tasks/${new mongoose.Types.ObjectId()}`);

            expect(res.status).toBe(404);
        });
    });

    describe('PUT /api/tasks/:id', () => {
        it('should update task', async () => {
            const task = await Task.create(testTask);
            const update = { title: 'Updated Title' };

            const res = await request(app)
                .put(`/api/tasks/${task._id}`)
                .send(update);

            expect(res.status).toBe(200);
            expect(res.body.data.title).toBe(update.title);
        });
    });

    describe('DELETE /api/tasks/:id', () => {
        it('should delete task', async () => {
            const task = await Task.create(testTask);

            const res = await request(app)
                .delete(`/api/tasks/${task._id}`);

            expect(res.status).toBe(200);
            
            const deletedTask = await Task.findById(task._id);
            expect(deletedTask).toBeNull();
        });
    });
});