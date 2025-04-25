"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreUserRepository = void 0;
const user_entity_1 = require("@domain/entities/user.entity");
const firestore_config_1 = require("@infra/firebase/firestore.config");
const uuid_1 = require("uuid");
class FirestoreUserRepository {
    constructor() {
        this.collection = firestore_config_1.db.collection('users');
    }
    async findByEmail(email) {
        const snapshot = await this.collection.where('email', '==', email).limit(1).get();
        if (snapshot.empty)
            return null;
        const doc = snapshot.docs[0];
        const data = doc.data();
        return new user_entity_1.User(doc.id, data.email, data.createAt.toDate());
    }
    async create(email) {
        const id = (0, uuid_1.v4)();
        const createdAt = new Date();
        await this.collection.doc(id).set({ email, createdAt });
        return new user_entity_1.User(id, email, createdAt);
    }
}
exports.FirestoreUserRepository = FirestoreUserRepository;
//# sourceMappingURL=user.repository.js.map