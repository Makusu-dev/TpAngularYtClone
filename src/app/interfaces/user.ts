export interface User  {
    email: string,
    password: string,
    roles: string[]
}


export interface LoggedUser  {
    email: string,
    token: string,
    roles: string[]
}

export interface UserToRegister  {
    email: string,
    pseudo: string,
    password: string,
    passwordConfirm: string,
    cityCode: string, 
    city: string,
    phone: string,
}
