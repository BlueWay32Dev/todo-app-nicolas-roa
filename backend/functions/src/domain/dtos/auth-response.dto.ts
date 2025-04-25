export interface AuthResponseDto {
    credentials: boolean;
    accessToken: string;
    refreshToken: string;
    userId: string;
    email?: string;
}