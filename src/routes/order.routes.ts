import express from "express";
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrder } from "../controllers/Order.controller";
import upload from "../config/multer";

const router= express.Router();

router.post('/:id/createOrder', createOrder);
router.get('/getOrders',getOrders);
router.get('/getOrder/:id',getOrderById);
router.patch('/updateOrder/:id',updateOrder);
router.delete('/deleteOrder/:id',deleteOrder);

export default router
