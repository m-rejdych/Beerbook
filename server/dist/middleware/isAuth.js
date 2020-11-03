"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const isAuth = (req, res, next) => {
    var _a;
    const token = (_a = req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        const error = new Error('Token not found!');
        error.statusCode = 403;
        throw error;
    }
    try {
        const decodedToken = jsonwebtoken_1.verify(token, config_1.USER_SECRET);
        const { userId } = decodedToken;
        req.userId = userId;
        next();
    }
    catch (error) {
        error.statusCode = 403;
        let errorMessage;
        switch (error.message) {
            case 'jwt malformed':
                errorMessage = 'Nice try ⛔️';
                break;
            case 'jwt expired':
                errorMessage = 'Timed out!';
                break;
            default:
                errorMessage = 'Authentication failed!';
        }
        error.message = errorMessage;
        next(error);
    }
};
exports.default = isAuth;
//# sourceMappingURL=isAuth.js.map