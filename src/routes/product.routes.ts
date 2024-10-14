import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/Product.controller";
import upload from "../config/multer";
const router=Router();

router.post('/:shopId/createProduct', upload.array("images",5), createProduct);
router.get('/:shopId/getProduct/:id',getProduct);
router.get('/:shopId/getProducts',getAllProducts);
router.delete('/:shopId/deleteProduct/:id',deleteProduct);
router.patch('/:shopId/updateProduct/:id',updateProduct);


export default router