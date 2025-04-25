import jwt from 'jsonwebtoken';
import { User } from '../domain/entities/user.entity';

const JWT_SECRET = process.env.JWT_SECRET || 'Atom';

export const generateAccessToken = (user: User): string => {
    return jwt.sign(
        { sub: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '15m'}
    );
}

export const generateRefreshToken = (user: User): string => {
    return jwt.sign(
        { sub: user.id },
        JWT_SECRET,
        { expiresIn: '7d'}
    );
}