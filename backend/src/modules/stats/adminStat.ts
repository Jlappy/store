import { Router, Request, Response } from "express";
import { OrderModel } from "../orders/orderModel";
import { BookModel } from "../books/bookModel";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // 1. Tổng số đơn hàng
    const totalOrders: number = await OrderModel.countDocuments();

    // 2. Tổng doanh thu
    const totalSalesResult = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    const totalSales = totalSalesResult[0]?.totalSales || 0;

    // 3. Số lượng sách trending
    const trendingBooksResult = await BookModel.aggregate([
      { $match: { trending: true } },
      { $count: "trendingBooksCount" },
    ]);
    const trendingBooks =
      trendingBooksResult.length > 0
        ? trendingBooksResult[0].trendingBooksCount
        : 0;

    // 4. Tổng số sách
    const totalBooks: number = await BookModel.countDocuments();

    // 5. Thống kê doanh thu theo tháng
    const monthlySales = await BookModel.aggregate([
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
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return res.status(500).json({
      message: "Failed to fetch admin stats",
      error,
    });
  }
});

export default router;
