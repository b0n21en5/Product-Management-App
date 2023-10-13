import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoute.js";
import { connectDB } from "./config/DB.js";
import authRoute from "./routes/authRoute.js";

const app = express();

// middlewares
app.use(cors({ origin: "https://product-management-client.netlify.app/" }));
app.use(express.json());

// routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoute);

// connect to database
connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Backend connected on PORT ${process.env.PORT}`);
});
