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
exports.giveBeer = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const Post_1 = __importDefault(require("../models/Post"));
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors
                .array()
                .map(({ msg }) => msg)
                .join(' '));
            error.statusCode = 422;
            throw error;
        }
        const { userId } = req;
        const { title, content, beers } = req.body;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            const error = new Error('User not found!');
            error.statusCode = 404;
            throw error;
        }
        const post = new Post_1.default({
            user: req.userId,
            title,
            content,
            beers,
        });
        yield post.save();
        user.posts = [...user.posts, post._id];
        yield user.save();
        res.status(201).json(post);
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors
                .array()
                .map(({ msg }) => msg)
                .join(' '));
            error.statusCode = 422;
            throw error;
        }
        const { userId } = req;
        const { title, content, beers, _id } = req.body;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            const error = new Error('User not found!');
            error.statusCode = 404;
            throw error;
        }
        const post = yield Post_1.default.findById(_id);
        if (!post) {
            const error = new Error('Post not found!');
            error.statusCode = 404;
            throw error;
        }
        if (post.user.toString() !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
            const error = new Error('Access denied!');
            error.statusCode = 403;
            throw error;
        }
        post.title = title;
        post.content = content;
        post.beers = beers;
        yield post.save();
        res.status(200).json({ message: 'Post successfully updated!' });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req;
        const { postId } = req.params;
        const user = yield User_1.default.findById(userId);
        if (!user) {
            const error = new Error('User not found!');
            error.statusCode = 404;
            throw error;
        }
        const post = yield Post_1.default.findById(postId);
        if (!post) {
            const error = new Error('Post not found!');
            error.statusCode = 404;
            throw error;
        }
        if (post.user.toString() !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
            const error = new Error('Access denied!');
            error.statusCode = 403;
            throw error;
        }
        yield Post_1.default.findByIdAndDelete(postId);
        user.posts = user.posts.filter((id) => id.toString() !== postId.toString());
        yield user.save();
        res.status(200).json({ message: 'Post successfully deleted!' });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePost = deletePost;
const giveBeer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const post = yield Post_1.default.findById(postId);
        if (!post) {
            const error = new Error('Post not found!');
            error.statusCode = 404;
            throw error;
        }
        post.beers = post.beers + 1;
        yield post.save();
        res.status(200).json({ message: 'Beer delivered! 🍻' });
    }
    catch (error) {
        next(error);
    }
});
exports.giveBeer = giveBeer;
//# sourceMappingURL=posts.js.map