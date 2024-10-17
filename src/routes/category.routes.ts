import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/Category.controller";


const router = Router();

router.post('/create', createCategory);
router.get('/getCategories', getAllCategories);
router.get('/getCategory/:id', getCategory);
router.delete('/deleteCategory/:id', deleteCategory);
router.patch('/updateCategory/:id', updateCategory);

export default router;