const Product = require("../models/Product");
const CustomApi = require("../errors");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  res.send("Get All Products");
};
const getSingleProduct = async (req, res) => {
  res.send("Get Single Products");
};
const updateProduct = async (req, res) => {
  res.send("update product Products");
};
const deleteProduct = async (req, res) => {
  res.send("Delete Products");
};

const uploadImage = async (req, res) => {
  let images = req.files.image;
  let urls = [];
  for (let i = 0; i < images.length; i++) {
    const element = images[i];
    const result = await cloudinary.uploader.upload(element.tempFilePath, {
      use_filename: true,
      folder: "images",
    });
    urls.push({ src: result.secure_url, id: result.asset_id });
    fs.unlinkSync(element.tempFilePath);
  }
  res.status(StatusCodes.OK).json({ urls });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
