import Shop from "../models/Shop.model";
import { Request, Response } from 'express';
import shopValidator  from "../utils/shop.validation";
import { Ishop } from "../types/shop.type";
import mongoose from "mongoose";

export const createShop= async (req: Request, res: Response): Promise<any> => {
    try {
        Shop.init()
        const owner= new mongoose.Types.ObjectId(req.params.id);
        const { error, value } = shopValidator(Object.assign({owner:String(owner)}, req.body));
        if (error) return res.status(400).json({ error: error.message });
        const newShop = new Shop(value);
        await newShop.save();
        return res.status(201).json({ newShop });
    } catch (error) {
        console.error('Error creating shop:', error);
        return res.status(500).json({ error: error });
    }
}

export const getShops= async (req: Request, res: Response): Promise<any>=>{
    try {
        const shops = await Shop.find();
        return res.json(shops);
    } catch (error) {
        console.error('Error getting shops:', error);
        return res.status(500).json({ error: error });
    }
}

export const getShopById= async (req: Request, res: Response): Promise<any>=>{
    try {
        const shop = await Shop.findById(req.params.shopId);
        if (!shop) return res.status(404).json({ message: 'Shop not found' });
        return res.json(shop);
    } catch (error) {
        console.error('Error getting shop:', error);
        return res.status(500).json({ error: error });
    }
}
export const updateShop= async(req:Request, res:Response):Promise<any>=>{
    try {
        const shop = await Shop.findByIdAndUpdate(req.params.shopId, req.body, { new: true });
        if (!shop) return res.status(404).json({ message: 'Shop not found' });
        shop.updatedAt= new  Date();
        shop.save();
        return res.json(shop);
    } catch (error) {
        console.error('Error updating shop:', error);
        return res.status(500).json({ error: error });
    }
}
export const deleteShop= async(req:Request, res:Response):Promise<any>=>{
    try {
        const shop = await Shop.findByIdAndDelete(req.params.shopId);
        if (!shop) return res.status(404).json({ message: 'Shop not found' });
        return res.json({ message: 'Shop deleted successfully' });
    } catch (error) {
        console.error('Error deleting shop:', error);
        return res.status(500).json({ error: error });
    }
}