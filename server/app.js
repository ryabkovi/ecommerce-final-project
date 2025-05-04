import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import mongoDB from "./db/connectMongo.js";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import axios from "axios";

// Init dotenv and connect MongoDB
config();
mongoDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      `${import.meta.env.VITE_API_BASE_URL}`,
      "https://ecommerce-final-project-client.onrender.com",
      "https://ecommerce-final-project-dashboard.onrender.com",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));

// Import Routes
import userRouter from "./routers/users.router.js";
import productRouter from "./routers/products.router.js";
import categoryRouter from "./routers/categories.router.js";
import orderRouter from "./routers/orders.router.js";
import feedbackRouter from "./routers/feedback.router.js";
import paymentRouter from "./routers/payment.router.js";

// Use Routes
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);
app.use("/feedback", feedbackRouter);
app.use("/payment", paymentRouter);

cron.schedule("0 0 0 * * *", async () => {
  try {
    await axios.post(
      "https://ecommerce-final-project-server.onrender.com/users/report-user"
    );
  } catch (error) {
    console.error("Failed cron report-user:", error.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
