"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const posts_1 = require("../controllers/posts");
const router = express_1.Router();
router.post('/create-post', isAuth_1.default, [
    express_validator_1.body('title', 'Title can not be empty!').trim().notEmpty(),
    express_validator_1.body('content', 'Content can not be empty!').trim().notEmpty(),
    express_validator_1.body('beers', 'Number of beers must be of type number!').isNumeric(),
], posts_1.createPost);
router.put('/update-post', isAuth_1.default, [
    express_validator_1.body('title', 'Title can not be empty!').trim().notEmpty(),
    express_validator_1.body('content', 'Content can not be empty!').trim().notEmpty(),
    express_validator_1.body('beers', 'Number of beers must be of type number!').isNumeric(),
], posts_1.updatePost);
router.get('/give-beer/:postId', isAuth_1.default, posts_1.giveBeer);
router.delete('/delete-post/:postId', isAuth_1.default, posts_1.deletePost);
exports.default = router;
//# sourceMappingURL=posts.js.map