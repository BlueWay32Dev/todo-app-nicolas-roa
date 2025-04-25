import {UserRepository} from "../../domain/interfaces/user.repository";
import { generateAccessToken, generateRefreshToken } from "../../shared/jwt";
import { AuthResponseDto } from "../../domain/dtos/auth-response.dto";

export class AuthServices {
    constructor(private readonly userRepo: UserRepository) {}

    async login(email:string): Promise<AuthResponseDto | null>{
        const user = await this.userRepo.findByEmail(email);
        if(!user){
            return null;
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        return { credentials: true, accessToken, refreshToken, userId: user.id};
    }

    async register(email:string): Promise<AuthResponseDto>{
        const user = await this.userRepo.create(email);
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        return { credentials: true, accessToken, refreshToken, userId: user.id};
    }
}