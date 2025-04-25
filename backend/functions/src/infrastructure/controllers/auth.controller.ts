import { Request, Response} from "express";
import { FirestoreUserRepository } from "../repositories/user.repository";
import { AuthServices } from "../../application/services/auth.services";

const userRepo = new FirestoreUserRepository();
const authServices = new AuthServices(userRepo);

const hasEmailEmpty = (request: Request):string => {
    const { email } = request.body;
    if (!email) throw new Error('EMPTY_EMAIL');
    return email;
}

export const loginHandler = async (request:Request, response:Response) => {
    try{
        const email = hasEmailEmpty(request);
        const token = await authServices.login(email);

        if(!token){
            return response.status(200).json({ message: 'El usuario no existe!', credentials:false})
        }

        return response.status(200).json(token);
    }catch (e) {
        const error = e as Error;
        if(error.message === 'EMPTY_EMAIL'){
            return response.status(400).json({ message: 'Correo es requerido' });
        }
        console.error(error, 'login');
        return response.status(500).json({ message: 'Error interno del servidor'});
    }
}

export const registerHandler = async (request:Request, response:Response) => {
    try{
        const {email} = request.body;
        const token = await authServices.register(email);
        return response.status(200).json(token);
    }catch (e) {
        console.error(e, 'register');
        return response.status(500).json({ message: 'Error interno del servidor'});
    }
}