import {UserRepository} from "../../domain/interfaces/user.repository";
import { generateAccessToken, generateRefreshToken } from "../../shared/jwt";

export class AuthServices {
    constructor(private readonly userRepo: UserRepository) {}

    async login(email:string): Promise<{ credentials:boolean, accessToken:string; refreshToken: string }>{
        let user = await this.userRepo.findByEmail(email);
        if(!user){
            return {credentials: false, accessToken: '', refreshToken: ''};
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        return { credentials: true, accessToken, refreshToken};
    }

    async register(email:string): Promise<{ credentials:boolean, accessToken:string; refreshToken: string }>{
        const user = await this.userRepo.create(email);
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        return { credentials: true, accessToken, refreshToken};
    }
}