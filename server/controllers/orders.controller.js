import orderModel from "../models/orders.model.js";
import userModel from "../models/users.model.js";
import {
  orderConfirmationEmail,
  orderStatusUpdateEmail,
} from "../service/mailTemplates.js";
import transporter from "../service/mailer.js";

export default {
  addOrder: async (req, res) => {
    try {
      const { shipment_address, products, total_price, isPaid } = req.body;

      if (
        !shipment_address.address ||
        !shipment_address.city ||
        !shipment_address.building
      )
        throw new Error("All shipment fields are required!");

      if (!products || products.length === 0)
        throw new Error("Order must contain at least one product.");

      const lastOrder = await orderModel.findOne().sort({ order_number: -1 });
      const nextOrderNumber = lastOrder ? lastOrder.order_number + 1 : 1;

      const order = await orderModel.create({
        user: req.user._id,
        shipment_address,
        products,
        total_price,
        isPaid: isPaid || false,
        order_number: nextOrderNumber,
      });

      await userModel.findByIdAndUpdate(req.user._id, {
        $push: { orders: order._id },
      });

      res.status(200).json({
        success: true,
        message: "Order placed successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to place order",
        error: error.message || error,
      });
    }
  },

  getOrders: async (req, res) => {
    try {
      const { page = 1, limit = 6, status = null } = req.query;
      const filter = status ? { status } : {};

      const count = await orderModel.countDocuments();

      const orders = await orderModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate([
          { path: "user", select: "user_firstName user_lastName user_email" },
          { path: "products.productId", populate: { path: "categories" } },
        ]);

      res.status(200).json({
        success: true,
        message: "Success get Orders",
        data: orders,
        pages: Math.ceil(count / limit),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "not Success get Orders",
        error: error.message || error,
      });
    }
  },

  getUserOrders: async (req, res) => {
    try {
      const orders = await orderModel
        .find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .populate([
          {
            path: "products.productId",
            select: "product_name product_price product_image categories",
            populate: { path: "categories", select: "category_name" },
          },
        ]);

      res.status(200).json({
        success: true,
        message: "User orders fetched successfully",
        orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch user orders",
        error: error.message,
      });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;

      const order = await orderModel.findByIdAndUpdate(
        id,
        { status: req.body.status },
        { new: true }
      );

      const populatedOrder = await orderModel.findById(id).populate("user");

      await transporter.sendMail({
        to: populatedOrder.user.user_email,
        from: process.env.MAIL_AUTH_USER,
        subject: `עדכון סטטוס להזמנתך - clickSHOP`,
        html: orderStatusUpdateEmail({
          userName: populatedOrder.user.user_firstName,
          orderNumber: populatedOrder.order_number,
          newStatus: req.body.status,
        }),
      });

      res.status(200).json({
        success: true,
        message: "Success update Status Order",
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "not Success update Status Order",
        error: error.message || error,
      });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;

      const order = await orderModel.findById(id);
      if (!order) throw new Error("Order not found");

      const isManager =
        req.user.permission === "Manager" || req.user.permission === "Admin";
      const isOwner = order.user.toString() === req.user._id;

      if (!isManager && !isOwner)
        return res.status(403).json({
          success: false,
          message: "Not authorized to delete this order",
        });

      await orderModel.findByIdAndDelete(id);
      await userModel.findByIdAndUpdate(order.user, {
        $pull: { orders: id },
      });

      res
        .status(200)
        .json({ success: true, message: "Order canceled successfully" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete order",
        error: error.message,
      });
    }
  },

  confirmPayment: async (req, res) => {
    try {
      const { id } = req.params;

      const order = await orderModel.findById(id).populate("user");
      if (!order) throw new Error("Order not found");

      // Update order to paid & status to new
      order.isPaid = true;
      order.status = "new";
      await order.save();

      // Send confirmation email after payment
      await transporter.sendMail({
        to: order.user.user_email,
        from: process.env.MAIL_AUTH_USER,
        subject: `אישור הזמנה חדשה - clickSHOP`,
        html: orderConfirmationEmail({
          userName: order.user.user_firstName,
          orderNumber: order.order_number,
          totalPrice: order.total_price,
          products: order.products,
        }),
      });

      res.status(200).json({
        success: true,
        message: "Payment confirmed and order updated",
        data: order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to confirm payment",
        error: error.message,
      });
    }
  },

  getOrdersSummary: async (req, res) => {
    try {
      const summary = await orderModel.aggregate([
        {
          $match: { isPaid: true },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            totalIncome: { $sum: "$total_price" },
            orderCount: { $sum: 1 },
          },
        },
        {
          $sort: { _id: -1 },
        },
        {
          $limit: 6,
        },
      ]);

      const monthNames = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const formatted = summary.map((item) => ({
        month: monthNames[item._id],
        totalIncome: item.totalIncome,
        orderCount: item.orderCount,
      }));

      res.status(200).json({
        success: true,
        message: "Orders summary by month",
        data: formatted.reverse(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to generate orders summary",
        error: error.message,
      });
    }
  },
  getWeeklyOrders: async (req, res) => {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

      const result = await orderModel.aggregate([
        {
          $match: {
            createdAt: { $gte: sevenDaysAgo },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            orderCount: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const completeData = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const key = d.toISOString().split("T")[0];
        const label = dayNames[d.getDay()];
        const found = result.find((r) => r._id === key);
        return { name: label, orders: found?.orderCount || 0 };
      });

      res.status(200).json({
        success: true,
        message: "Weekly orders data",
        data: completeData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch weekly orders",
        error: error.message,
      });
    }
  },
};
