"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const user_1 = require("../controllers/user");
const router = express_1.Router();
router.get('get-users', isAuth_1.default, user_1.getUsers);
router.get('get-user', isAuth_1.default, user_1.getUser);
exports.default = router;
//# sourceMappingURL=user.js.map