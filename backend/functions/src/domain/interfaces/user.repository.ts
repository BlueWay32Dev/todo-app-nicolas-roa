import { User } from '../entities/user.entity';

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    create(email:string): Promise<User>;
}