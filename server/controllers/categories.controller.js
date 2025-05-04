import categoryModel from "../models/categories.model.js";
import uploadImage from "../service/cloudinary.js";

export default {
  addCategory: async (req, res) => {
    if (req.file) {
      const result = await uploadImage(req.file.path);
      if (!result) throw new Error("Image not Valid");
      req.body.category_image = result;
    }
    try {
      const { category_name } = req.body;

      if (!category_name) throw new Error("category Name required!");

      const category = await categoryModel.create(req.body);

      res.status(200).json({
        success: true,
        message: "Success add category",
        category,
      });
    } catch (error) {
      if (error.code === 11000) error.message = "CategoryName already exist!";
      res.status(500).json({
        success: false,
        message: "not Success add category",
        error: error.message || error,
      });
    }
  },
  getCategories: async (req, res) => {
    try {
      const categories = await categoryModel.find();

      res.status(200).json({
        success: true,
        message: "Success get categories",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "not Success get categories",
        error: error.message || error,
      });
    }
  },
  updateCategory: async (req, res) => {
    if (req.file) {
      const result = await uploadImage(req.file.path);
      if (!result) throw new Error("Image not Valid");
      req.body.category_image = result;
    }
    try {
      const { id } = req.params;

      await categoryModel.findByIdAndUpdate(id, req.body);

      res.status(200).json({
        success: true,
        message: "Success Update category",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "not Success Update category",
        error: error.message || error,
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;

      await categoryModel.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Success Delete category",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "not Success Delete category",
        error: error.message || error,
      });
    }
  },
};
