export interface NameModel {
    first: string;
    last: string;
}
  
export interface LoginModel {
    uuid: string;
}
  
export interface UserModel {
    id: number;
    name: NameModel;
    email: string;
    password: string;
}

export interface UserResponseModel {
    id: number;
    name: NameModel;
    email: string;
    login: {
        uuid: string;
    }
}

export interface UserWithLogin extends UserModel {
    login?: LoginModel;
}