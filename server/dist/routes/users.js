"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const users_1 = require("../controllers/users");
const router = express_1.Router();
router.get('/get-users', isAuth_1.default, users_1.getUsers);
router.get('/get-user/:userId', isAuth_1.default, users_1.getUser);
exports.default = router;
//# sourceMappingURL=users.js.map