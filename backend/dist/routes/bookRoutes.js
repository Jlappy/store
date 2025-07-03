"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookControler_1 = require("../controllers/bookControler");
const router = express_1.default.Router();
router.get('/', bookControler_1.getBooks);
router.post('/', bookControler_1.createBook);
exports.default = router;
