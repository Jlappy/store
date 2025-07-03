"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/modules/admin/admin.route.ts
const express_1 = __importDefault(require("express"));
const userController_1 = require("./userController");
const router = express_1.default.Router();
router.post("/admin", userController_1.loginAdmin);
exports.default = router;
