import express from "express";
// import products from '../data/products.js';
// import Product from "../models/productModel.js";
// import asyncHandler from '../middleware/asyncHandler.js'
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from '../middleware/checkObjectId.js'

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route('/top').get(getTopProducts)
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview)

// router.get('/', asyncHandler(async (req, res) => {
//     const products = await Product.find({})
//     res.json(products)
// }))

// router.get('/:id', asyncHandler(async(req, res) => {
//     // const product = products.find((p) => p._id === req.params.id);
//     const product = await Product.findById(req.params.id);

//     if(product){
//         return res.json(product);
//     }else{
//         // res.status(404).json({message: 'Product not found'})
//         res.status(404)
//         throw new Error('Resource not found')
//     }

//     // res.json(product);
// }))

export default router;
