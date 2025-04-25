import jwt from 'jsonwebtoken';
import { User } from '../domain/entities/user.entity';


interface AccessTokenPayload {
    sub: string;
    email: string;
}

interface RefreshTokenPayload {
    sub: string;
}

export const generateAccessToken = (user: User): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET no definido en variables de entorno.');
    }

    const payload: AccessTokenPayload = {
        sub: user.id,
        email: user.email,
    };

    return jwt.sign(payload, secret, { expiresIn: '15m' });
}

export const generateRefreshToken = (user: User): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET no definido en variables de entorno.');
    }

    const payload: RefreshTokenPayload = {
        sub: user.id,
    };

    return jwt.sign(payload, secret, { expiresIn: '7d' });
}
