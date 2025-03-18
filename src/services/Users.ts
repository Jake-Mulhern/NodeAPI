// src/services/Users.ts
import { UserModel } from '../models/User';

export let users: UserModel[] = [
    {
        id: 1,
        name: {
            first: 'Bemis',
            last: 'Mulhern'
        },
        email: 'bemis@test.com',
        password: '$2b$10$.1mRmkZ1InvyIHizY4DB6uzoQ546/8s24eGNRDST0SBj3Gi9VvB8u' // farter
    },
    {
        id: 2,
        name: {
            first: 'Zeke',
            last: 'Alexson'
        },
        email: 'zeke@test.com',
        password: '$2b$10$zi7mBC3WS1FDaeNW0BGMFOhjYrXN6mGZHvwbFAO6miftpD6feWNGy'  // fatter
    },
];


export const find = (id: string) => {
    console.log(`Finding User ${id}`);
    const user = users.find((t) => t.id === parseInt(id));

    return user;
}

export const findUserEmail = (email: string) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            console.log('should return true here')
            return users[i];
        }
    }

    return null;
}


export const create = (taskData: UserModel) => {
    console.log('Creating new user');
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === taskData.email) {
            return null;
        }
    }
    const newId = users.length + 1;
    const newUser = {
        id: newId,
        name: {
            first: taskData.name.first,
            last: taskData.name.last
        },
        email: taskData.email,
        password: taskData.password

    }
    users.push(newUser);
    console.log('Created new user: ', newUser);
    console.log('All Users: ', users);

    return newUser;
}

// export const update = (taskData: UserModel, id: string) => {
//     console.log('Updating user')
//     const user = users.find((t) => t.id === parseInt(id));

//     if (!user) {
//         return null;
//     } else {
//         user.title = taskData.title || user.title;
//         user.description = taskData.description || user.description;
//         user.completed = taskData.completed || user.completed;
//         users = [...users];
//         return user;
//     }
// }

export const remove = (id: string) => {
    const index = users.findIndex((t) => t.id === parseInt(id));

    if (index === -1) {
        return null;
    } else {
        users.splice(index, 1);
        users = [...users];
        return index;
    }
}

// export const login = (email: string, password: string) => {

// }