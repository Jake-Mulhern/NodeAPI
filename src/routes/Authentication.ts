// src/routes/tasks.ts
import { Router, Request, Response } from 'express';
import { UserModel, UserResponseModel } from '../models/User';
import { register, login } from '../services/Authentication';

const authRouter = Router();


authRouter.post('/register', async (req: Request, res: Response) => {
    const user: UserModel = req.body;

    const newUser: UserResponseModel | null | undefined = await register(user);
    if (!newUser) {
        console.log('New User Is Null')
        res.status(400).json({
           "status": 400,
            "message": "Email already in use", 
        });
    } else {
        console.log('New user equals null: ', newUser === null);
        res.status(201).json(newUser);
    }
});

authRouter.post('/login', async (req: Request, res: Response) => {
    const loginResponse: UserResponseModel | null = await login(req.body.email, req.body.password);
    console.log('Login Response: ', loginResponse);

    if (!loginResponse) {
        res.status(404).json({
            status: 404,
            success: false,
            message: "User not found"
        });
        return;
    }

    res.status(200).json({
        status: 200,
        success: true,
        message: "Successfully Logged In!"
    });
    return;


})


export default authRouter;