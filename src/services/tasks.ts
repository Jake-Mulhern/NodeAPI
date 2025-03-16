// src/services/tasks.ts
import { Task } from '../models/task';

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

export const find = (id: string) => {
    console.log(`Finding Task ${id}`);
    const task = tasks.find((t) => t.id === parseInt(id));

    return task;
}

export const findAll = () => {
    return tasks;
}

export const create = (taskData: Task) => {
    console.log('Creating new task');
    tasks.push(taskData);
    const newTask = tasks.slice(-1);

    return newTask;
}

export const update = (taskData: Task, id: string) => {
    console.log('Updating task')
    const task = tasks.find((t) => t.id === parseInt(id));

    if (!task) {
        return null;
    } else {
        task.title = taskData.title || task.title;
        task.description = taskData.description || task.description;
        task.completed = taskData.completed || task.completed;
        tasks = [...tasks];
        return task;
    }
}

export const remove = (id: string) => {
    const index = tasks.findIndex((t) => t.id === parseInt(id));

    if (index === -1) {
        return null;
    } else {
        tasks.splice(index, 1);
        tasks = [...tasks];
        return index;
    }
}
