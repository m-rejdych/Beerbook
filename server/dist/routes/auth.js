"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const router = express_1.Router();
router.post('/signup', [
    express_validator_1.body('email', 'Invalid email!').isEmail().normalizeEmail(),
    express_validator_1.body('name', 'Name should be at least 2 characters long!')
        .trim()
        .isLength({ min: 2 }),
    express_validator_1.body('password').custom((value) => {
        if (!/^(?=.*\d).{4,8}$/.test(value))
            throw new Error('Password should be at least 4 characters long and contain at least one number!');
        return true;
    }),
    express_validator_1.body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password)
            throw new Error('Passwords must match each other!');
        return true;
    }),
], auth_1.signup);
router.post('/login', [express_validator_1.body('email', 'Invalid email!').isEmail().normalizeEmail()], auth_1.login);
router.get('/autologin', isAuth_1.default, auth_1.autologin);
exports.default = router;
//# sourceMappingURL=auth.js.map