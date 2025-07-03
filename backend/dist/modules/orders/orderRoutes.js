"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orderController_1 = require("./orderController");
const router = express_1.default.Router();
router.post("/", orderController_1.OrderController.createOrder);
router.get("/", orderController_1.OrderController.handleGetAllOrders);
exports.OrderRoutes = router;
