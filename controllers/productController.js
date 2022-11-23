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
  console.log(req.files);
  let urls = [];
  // for (let i = 0; i < req.files.length; i++) {
  //   const element = array[i];
  //   console.log("element =>", element);
  //   const result = await cloudinary.uploader.upload(
  //     req.files.image.tempFilePath,
  //     {
  //       use_filename: true,
  //       folder: "file-upload",
  //     }
  //   );
  //   urls.push(result);
  //   fs.unlinkSync(req.files.image.tempFilePath);
  // }
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
