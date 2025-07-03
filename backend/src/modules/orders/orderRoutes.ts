import express from "express";
import { OrderController } from "./orderController";

const router = express.Router();

router.post("/", OrderController.createOrder)
router.get("/", OrderController.handleGetAllOrders)

export const OrderRoutes = router;