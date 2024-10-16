import { Router } from "express";
import { createShop, deleteShop, getShopById, getShopByUid, getShops, updateShop } from "../controllers/Shop.controller";
import upload from "../config/multer";

const router = Router();

router.post('/:id/createShop', upload.array('images',3), createShop);
router.get('/getShops/:id', getShopByUid)
router.get('/getShops', getShops);
router.get('/getShop/:shopId', getShopById);
router.patch('/updateShop/:shopId', updateShop);
router.delete('/deleteShop/:shopId', deleteShop);

export default router;