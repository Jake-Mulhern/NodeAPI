// src/routes/tasks.ts
import { Router, Request, Response } from 'express';
import { Task } from '../models/task';
import { find, findAll, create, update, remove } from '../services/tasks';

const taskRouter = Router();

let tasks: Task[] = [
    {
        id: 1,
        title: 'test title 1',
        description: 'Test Descr 1',
        completed: true,
    },
    {
        id: 2,
        title: 'test title 2',
        description: 'Test Descr 2',
        completed: true,
    },
];

taskRouter.get('/', (req: Request, res: Response) => {
    const tasks = findAll();
    res.json(tasks);
});

taskRouter.get('/:id', (req: Request, res: Response) => {
    // const task = tasks.find((t) => t.id === parseInt(req.params.id));
    const task = find(req.params.id);
    if (!task) {
        res.send(404).send('Task not found');
    } else {
        res.json(task);
    }
});


taskRouter.post('/', (req: Request, res: Response) => {
    const task: Task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false
    };

    const newTask = create(task);
    res.status(201).json(task);
});

taskRouter.put('/:id', (req: Request, res: Response) => {
    const updatedTask = update(req.body, req.params.id);
    if (!updatedTask) {
        res.status(404).send('Task not found');
    } else {
        res.json(updatedTask);
    }

});

taskRouter.delete('/:id', (req: Request, res: Response) => {
    const deleteTask = remove(req.params.id);

    if (!deleteTask) {
        res.status(404).send('Task not found');
    } else {
        res.status(204).send();
    }
});

export default taskRouter;