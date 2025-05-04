import { Router } from "express";
import upload from "../middleware/parseFiles.js";
import queries from "../controllers/categories.controller.js";
import protectManager from "../middleware/protectManager.js";
import categoryModel from "../models/categories.model.js";

const { addCategory, getCategories, updateCategory, deleteCategory } = queries;
const router = Router();

router.post(
  "/addCategory",
  upload.single("category_image"),
  protectManager,
  addCategory
);

router.get("/getCategories", getCategories);

router.put(
  "/updateCategory/:id",
  upload.single("category_image"),
  protectManager,
  updateCategory
);

router.delete("/deleteAllCategories", async (req, res) => {
  try {
    await categoryModel.deleteMany();
    res.status(200).json({
      success: true,
      message: "All categories deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete all categories",
      error: error.message,
    });
  }
});

router.delete("/deleteCategory/:id", deleteCategory);

export default router;
