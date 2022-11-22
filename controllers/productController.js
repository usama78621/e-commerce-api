const createProduct = async (req, res) => {
  res.send("Create new Products");
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
  res.send("Upload  Products");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
