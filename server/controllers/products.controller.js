import productModel from "../models/products.model.js";
import uploadImage from "../service/cloudinary.js";
import axios from "axios";

export default {
  getAllProducts: async (req, res) => {
    try {
      const { page = 1, limit, category } = req.query;
      const parsedLimit = parseInt(limit) || 10;

      const query = {};
      if (category) {
        query.categories = category;
      }

      const count = await productModel.countDocuments(query);

      const products = await productModel
        .find(query)
        .skip((page - 1) * parsedLimit)
        .limit(parsedLimit)
        .populate("categories");

      res.status(200).json({
        success: true,
        message: "Success get Products",
        data: products,
        pages: Math.ceil(count / parsedLimit),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "not Success Get Products",
        error: error.message || error,
      });
    }
  },
  addProduct: async (req, res) => {
    if (req.file) {
      const result = await uploadImage(req.file.path);
      if (!result) throw new Error("Image not Valid");
      req.body.product_image = result;
    }

    try {
      const { product_name, product_price, categories } = req.body;
      if (!product_name | !product_price | !categories) {
        throw new Error("All Field Required");
      }

      req.body.categories = JSON.parse(categories);
      await productModel.create(req.body);
      res.status(200).json({ message: "success add Product", success: true });
    } catch (error) {
      res.status(500).json({
        message: "Error in create Product",
        success: false,
        error: error.message,
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      await productModel.findByIdAndDelete(id);
      res
        .status(200)
        .json({ message: "success DELETE Product", success: true });
    } catch (error) {
      res.status(500).json({
        message: "Error in DELETE Product",
        success: false,
        error: error.message,
      });
    }
  },
  deleteAllProducts: async (req, res) => {
    try {
      await productModel.deleteMany({});
      res.status(200).json({
        success: true,
        message: "All products deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete all products",
        error: error.message,
      });
    }
  },
  updateProduct: async (req, res) => {
    if (req.file) {
      const result = await uploadImage(req.file.path);
      if (!result) throw new Error("Image not Valid");
      req.body.product_image = result;
    }
    try {
      const { id } = req.params;
      req.body.categories = JSON.parse(req.body.categories);
      const body = req.body;
      const product = await productModel.findByIdAndUpdate(id, body, {
        new: true,
      });
      res
        .status(200)
        .json({ message: "success UPDATE Product", success: true, product });
    } catch (error) {
      res.status(500).json({
        message: "Error in UPDATE Product",
        success: false,
        error: error.message,
      });
    }
  },
  autoComplete: async (req, res) => {
    try {
      const { search } = req.query;

      const agg = [
        {
          $search: {
            index: "products_search",
            compound: {
              should: [
                {
                  autocomplete: {
                    query: search,
                    path: "product_name",
                    fuzzy: {
                      maxEdits: 1,
                    },
                    score: { boost: { value: 2 } },
                  },
                },
                {
                  autocomplete: {
                    query: search,
                    path: "product_description",
                    fuzzy: {
                      maxEdits: 1,
                    },
                    score: { boost: { value: 1 } },
                  },
                },
              ],
            },
          },
        },
        { $limit: 5 },
        {
          $project: {
            _id: 1,
            product_name: 1,
            score: { $meta: "searchScore" },
          },
        },
      ];

      const suggestions = await productModel.aggregate(agg);

      res.status(200).json({
        message: "success Search Products Collection",
        success: true,
        suggestions,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error in Search AuthComplete",
        success: false,
        error: error.message,
      });
    }
  },
  downloadImage: async (req, res) => {
    try {
      const { url } = req.query;

      // Fetch image from Cloudinary
      const response = await axios.get(url, { responseType: "stream" });

      // Get the content type and set it in response headers
      const contentType = response.headers["content-type"];
      console.log(contentType);
      res.setHeader("Content-Type", contentType);

      // Set content disposition to force download
      const fileName = url.split("/").pop();
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}"`
      );

      // Pipe the image data to response
      response.data.pipe(res);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error in GET PRODUCT IMAGE",
        success: false,
        error: error.message,
      });
    }
  },
};
