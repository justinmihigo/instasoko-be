import  { Router  } from "express";
import { createShop, deleteShop, getShopById, getShops, updateShop } from "../controllers/Shop.controller";

const router= Router();

router.post('/:id/createShop', createShop);
router.get('/getShops', getShops);
router.get('/getShops/:shopId',getShopById);
router.patch('/updateShop/:shopId', updateShop);
router.delete('/deleteShop/:shopId', deleteShop);

export default router;