const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");
const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authentication");

router
  .route("/")
  .post([authenticateUser, authorizePermission("admin")], createProduct)
  .get(getAllProducts);

router.post("/uploadImage", upload.array("image"), uploadImage);

router
  .route("/:id")
  .get([authenticateUser, authorizePermission("admin")], getSingleProduct)
  .patch([authenticateUser, authorizePermission("admin")], updateProduct)
  .delete([authenticateUser, authorizePermission("admin")], deleteProduct);

module.exports = router;
