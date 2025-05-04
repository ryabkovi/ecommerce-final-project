import { Router } from "express";
import queries from "../controllers/products.controller.js";
import upload from "../middleware/parseFiles.js";
const router = Router();
const {
  getAllProducts,
  addProduct,
  deleteProduct,
  deleteAllProducts,
  updateProduct,
  autoComplete,
  downloadImage,
} = queries;

router.get("/getAllProducts", getAllProducts);
router.post("/addProduct", upload.single("product_image"), addProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.delete("/deleteAll", deleteAllProducts);
router.put("/updateProduct/:id", upload.single("product_image"), updateProduct);
router.get("/autoComplete", autoComplete);
router.get("/downloadImage", downloadImage);

export default router;
