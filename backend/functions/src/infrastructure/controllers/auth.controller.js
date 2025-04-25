"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = void 0;
const user_repository_1 = require("@infra/repositories/user.repository");
const auth_services_1 = require("@app/services/auth.services");
const userRepo = new user_repository_1.FirestoreUserRepository();
const authServices = new auth_services_1.AuthServices(userRepo);
const loginHandler = async (request, response) => {
    try {
        const { email } = request.body;
        if (!email || typeof email !== 'string') {
            return response.status(400).json({ message: 'Correo es requerido' });
        }
        const token = await authServices.login(email);
        return response.status(200).json(token);
    }
    catch (error) {
        console.error(error, 'login');
        return response.status(500).json({ message: 'Error interno del servidor' });
    }
};
exports.loginHandler = loginHandler;
//# sourceMappingURL=auth.controller.js.map