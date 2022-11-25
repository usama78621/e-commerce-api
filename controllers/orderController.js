const Order = require("../models/Order");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const fakeStripeAPI = async ({ amount, currency }) => {};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided");
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError(
      "Please provide tax and shipping fee"
    );
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id : ${item.product}`
      );
    }
    const { name, price, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image: item.image,
      product: _id,
    };
    // add item to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
    subtotal += item.amount * price;
  }

};
const getAllOrders = async (req, res) => {
  res.send("get all Orders");
};
const getCurrentUserOrders = async (req, res) => {
  res.send("getCurrentUserOrders all");
};
const getSingleOrder = async (req, res) => {
  res.send("getSingleOrder GET");
};
const updateOrder = async (req, res) => {
  res.send("updateOrder ");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
