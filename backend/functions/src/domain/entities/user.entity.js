"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, email, createdAt) {
        this.id = id;
        this.email = email;
        this.createdAt = createdAt;
    }
    toJSON() {
        return {
            id: this.id,
            email: this.email,
            createAt: this.createdAt.toISOString()
        };
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map