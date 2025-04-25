"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const jwt_1 = require("@shared/jwt");
class AuthServices {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async login(email) {
        let user = await this.userRepo.findByEmail(email);
        if (!user) {
            user = await this.userRepo.create(email);
        }
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user);
        return { accessToken, refreshToken };
    }
}
exports.AuthServices = AuthServices;
//# sourceMappingURL=auth.services.js.map