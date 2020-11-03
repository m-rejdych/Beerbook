"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autologin = exports.login = exports.signup = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../models/User"));
const config_1 = require("../config");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors
                .array()
                .map(({ msg }) => msg)
                .join('\n'));
            error.statusCode = 422;
            throw error;
        }
        const { email, name, password } = req.body;
        const foundUser = yield User_1.default.findOne({ email });
        if (foundUser) {
            const error = new Error('This email is already in use!');
            error.statusCode = 401;
            throw error;
        }
        const hashedPassword = yield bcryptjs_1.hash(password, 12);
        const user = yield new User_1.default({ email, name, password: hashedPassword });
        yield user.save();
        const token = jsonwebtoken_1.sign({ userId: user._id, email }, config_1.USER_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({
            token,
            userId: user._id,
            name,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors
                .array()
                .map(({ msg }) => msg)
                .join('\n'));
            error.statusCode = 422;
            throw error;
        }
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            const error = new Error('User not found!');
            error.statusCode = 401;
            throw error;
        }
        const isPasswordValid = yield bcryptjs_1.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jsonwebtoken_1.sign({ email: user.email, userId: user._id }, config_1.USER_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            token,
            userId: user._id,
            name: user.name,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const autologin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            const error = new Error('User not found!');
            error.statusCode = 404;
            throw error;
        }
        const { name } = user;
        res.json({ name, userId });
    }
    catch (error) {
        next(error);
    }
});
exports.autologin = autologin;
//# sourceMappingURL=auth.js.map