import { handleError } from "../helpers/handleError.js";
import { ProductModel } from "../models/ProductModel.js";

export const addNewProduct = async (req, res) => {
  try {
    const { productId, name, price, featured, rating, company, createdAt } =
      req.body;

    const existingProduct = await ProductModel.findOne({
      productId: productId,
    });
    if (existingProduct) {
      return res
        .status(400)
        .send({ success: false, message: "Product already added!" });
    }

    const newProduct = await new ProductModel({
      productId,
      name,
      price,
      featured,
      rating,
      createdAt,
      company,
    }).save();

    return res
      .status(200)
      .send({ success: true, message: "New Product Added" });
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { price, rating } = req.query;
    const filterCriteria = {};
    if (price) {
      filterCriteria.price = { $lt: price };
    }
    if (rating) {
      filterCriteria.rating = { $gt: rating };
    }

    const allProducts = await ProductModel.find(filterCriteria);

    return res.status(200).send(allProducts);
  } catch (error) {
    handleError(res, error);
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ productId: req.params.pid });

    if (!product)
      return res
        .status(404)
        .send({ success: false, message: "No Product Found!" });

    return res.status(200).send(product);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, featured, rating, company } = req.body;

    const existingProduct = await ProductModel.findOne({
      productId: req.params.pid,
    });
    if (!existingProduct) {
      res.status(404).send({ success: false, message: "No Product Found!" });
    }

    if (name !== undefined) existingProduct.name = name;
    if (price !== undefined) existingProduct.price = price;
    if (featured !== undefined) existingProduct.featured = featured;
    if (rating !== undefined) existingProduct.rating = rating;
    if (company !== undefined) existingProduct.company = company;

    const updatedProduct = await existingProduct.save();

    return res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      updatedProduct,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findOneAndDelete({
      productId: req.params.pid,
    });

    return res.status(200).send({ success: true, message: "Product Deleted!" });
  } catch (error) {
    return handleError(res, error);
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await ProductModel.find({ featured: true });
    return res.status(200).send(featuredProducts);
  } catch (error) {
    handleError(res, error);
  }
};
