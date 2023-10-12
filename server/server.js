import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoute.js";
import { connectDB } from "./config/DB.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/products", productRoutes);

// connect to database
connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Backend connected on PORT ${process.env.PORT}`);
});