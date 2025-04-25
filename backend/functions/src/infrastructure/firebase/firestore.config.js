"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firestore_1 = require("firebase-admin/firestore");
const app_1 = require("firebase-admin/app");
if ((0, app_1.getApps)().length === 0) {
    (0, app_1.initializeApp)({
        credential: (0, app_1.applicationDefault)()
    });
}
exports.db = (0, firestore_1.getFirestore)();
//# sourceMappingURL=firestore.config.js.map