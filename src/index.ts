// src/index.ts
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from "dotenv";
import taskRouter from './routes/tasks';
import authRouter from './routes/Authentication';

dotenv.config();

const app = express();
const port = process.env.PORT || 3535;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!!');
});
app.use('/tasks', taskRouter);

/* Authentication Routes */
app.use('/auth', authRouter);

/* Error Handling Middleware */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

