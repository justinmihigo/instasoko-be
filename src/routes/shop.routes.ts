import { Router } from "express";
import { createShop, deleteShop, findShopByLocation, getShopById, getShopByUid, getShops, updateShop } from "../controllers/Shop.controller";
import upload from "../config/multer";

const router = Router();

router.post('/:id/createShop', upload.array('images',3), createShop);
router.get('/getShops/:id', getShopByUid)
router.get('/getShops', getShops);
router.get('/getShopbyId/:shopId', getShopById);
router.patch('/updateShop/:shopId', upload.array('images',3), updateShop);
router.get('/findShops/', findShopByLocation);
router.delete('/deleteShop/:shopId', deleteShop);

export default router;