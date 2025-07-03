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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderModel_1 = require("../orders/orderModel");
const bookModel_1 = require("../books/bookModel");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // 1. Tổng số đơn hàng
        const totalOrders = yield orderModel_1.OrderModel.countDocuments();
        // 2. Tổng doanh thu
        const totalSalesResult = yield orderModel_1.OrderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                },
            },
        ]);
        const totalSales = ((_a = totalSalesResult[0]) === null || _a === void 0 ? void 0 : _a.totalSales) || 0;
        // 3. Số lượng sách trending
        const trendingBooksResult = yield bookModel_1.BookModel.aggregate([
            { $match: { trending: true } },
            { $count: "trendingBooksCount" },
        ]);
        const trendingBooks = trendingBooksResult.length > 0
            ? trendingBooksResult[0].trendingBooksCount
            : 0;
        // 4. Tổng số sách
        const totalBooks = yield bookModel_1.BookModel.countDocuments();
        // 5. Thống kê doanh thu theo tháng
        const monthlySales = yield bookModel_1.BookModel.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m", date: "$createdAt" },
                    },
                    totalSales: { $sum: "$totalPrice" },
                    totalOrders: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        // Gửi kết quả
        return res.status(200).json({
            totalOrders,
            totalSales,
            trendingBooks,
            totalBooks,
            monthlySales,
        });
    }
    catch (error) {
        console.error("Error fetching admin stats:", error);
        return res.status(500).json({
            message: "Failed to fetch admin stats",
            error,
        });
    }
}));
exports.default = router;
