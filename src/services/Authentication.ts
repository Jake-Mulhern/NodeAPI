import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { create, findUserEmail } from "./Users"
import { UserModel, UserResponseModel, UserWithLogin } from '../models/User';

export const register = async (taskData: UserModel): Promise<UserResponseModel | null> => {
    const plainTextPassword = taskData.password;
    const hashedPassword = await hashPassword(plainTextPassword);
    taskData.password = hashedPassword;
    console.log('TASK DATA HASHED: ', taskData);
    const newUser = create(taskData);
    
    if (!newUser) {
        return null;
    }

    try {
        const token: string = getJWTToken(newUser.id, newUser.email);
        const loggedInUser: UserResponseModel = {
            id: newUser.id,
            name: {
                first: newUser.name.first,
                last: newUser.name.last
            },
            email: newUser.email,
            login: {
                uuid: token,
            }
        };
        console.log('Final Output: ', loggedInUser);
        return loggedInUser;
    } catch (err) {
        return null;
    }
};

export const login = async (email: string, password: string): Promise<UserResponseModel | null> => {
    try {
        const userLoggingIn = findUserEmail(email) as UserWithLogin;
        console.log('Found User Email: ', userLoggingIn);
    
        if (!userLoggingIn) {
            return null;
        }

        const passwordMatch = await bcrypt.compare(password, userLoggingIn.password);
        console.log('Compared Passwords: ', passwordMatch);

        if (passwordMatch) {
            try {
                const jwtToken = getJWTToken(userLoggingIn.id, userLoggingIn.email);
                console.log('Got JWT Token: ', jwtToken)
                
                if (jwtToken) {
                    const response: UserResponseModel = {
                        id: userLoggingIn.id,
                        name: userLoggingIn.name,
                        email: userLoggingIn.email,
                        login: { uuid: jwtToken }
                    };
                    console.log('Returning Token and User')
                    return response;
                }
                return null;
            } catch (err) {
                console.error('Error generating JWT Token:', err);
                return null;
            }
        }
        return null;
    } catch (err) {
        console.error('Error Logging In: ', err);
        throw err;
    }
    
};

const getJWTToken = (id: number, email: string) => {
    const token: string = jwt.sign({id, email}, 'shhhh');
    console.log('token returned: ', token);

    return token;
}

const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt: string = await bcrypt.genSalt();
        const hashedPassword: string = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        console.error('Error Hashing Password');
        throw err;
    }
}