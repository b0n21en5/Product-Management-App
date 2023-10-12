import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
});

export const ProductModel = mongoose.model("products", productSchema);
