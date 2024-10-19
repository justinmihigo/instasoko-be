import Shop from "../models/Shop.model";
import { Request, Response } from 'express';
import shopValidator from "../utils/shop.validation";
import { Ishop } from "../types/shop.type";
import cloudinary from "../utils/cloudinary";

export const createShop = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Request body:', JSON.stringify(req.body, null, 2));
        console.log('Request files:', req.files);
        console.log('Request params:', req.params);

        const files = req.files as Express.Multer.File[];
        if (!files || files.length === 0) {
            res.status(400).json({ message: 'No files uploaded' });

            return;
        }

        const uploadPromises = files.map((file) => cloudinary.uploader.upload(file.path, {
            transformation: [{
                width: 480,
                height: 360,
                crop: 'fill'
            }]
        }));
        const uploadResults = await Promise.all(uploadPromises);

        const secure_urls = uploadResults.map(result => result.secure_url);
        console.log('Uploaded URLs:', secure_urls);
        const { lat, lng } = req.body as any;
        const coordinates:number[]= [Number(lng),Number(lat)]
        const owner = req.params.id;
        const shopData: any = {
            ...req.body,
            owner: owner,
            location: { type:'Point', coordinates:coordinates},
            images: secure_urls
        };

        console.log('Shop data before validation:', JSON.stringify(shopData, null, 2));

        // const { error, value } = shopValidator(shopData);
        // if (error) {
        //     console.error('Validation error:', error.details);
        //     res.status(400).json({ error: error.details[0].message });
        //     return;
        // }

        const newShop = new Shop(shopData);
        const savedShop = await newShop.save();
        console.log('Saved shop:', savedShop);

        res.status(201).json({ newShop: savedShop });
    } catch (error) {
        console.error('Error in createShop:', error);

        if (error instanceof Error) {
            console.error('Error name:', error.name);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        } else {
            console.error('Unknown error type:', JSON.stringify(error, null, 2));
        }

        res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
export const getShopByUid = async (req: Request, res: Response): Promise<any> => {
    try {
        const ownerId = req.params.id;
        const shop = await Shop.find({ owner: ownerId });
        if (!shop) return res.status(404).json({ message: 'Shop not found' });
        return res.json(shop);
    } catch (error) {
        console.error('Error getting shop:', error);
        return res.status(500).json({ error: error });
    }
}
export const getShops = async (req: Request, res: Response): Promise<any> => {
    try {
        const shops = await Shop.find().sort({ 'createdAt': -1 })
        return res.json(shops);
    } catch (error) {
        console.error('Error getting shops:', error);
        return res.status(500).json({ error: error });
    }
}

export const getShopById = async (req: Request, res: Response): Promise<any> => {
    try {
        const shop = await Shop.findById(req.params.shopId);
        if (!shop) return res.status(404).json({ message: 'Shop not found' });
        return res.json(shop);
    } catch (error) {
        console.error('Error getting shop:', error);
        return res.status(500).json({ error: error });
    }
}
export const updateShop = async (req: Request, res: Response): Promise<any> => {
    try {
        const files = req.files as Express.Multer.File[];
        if (files && files.length > 0) {
            const uploadPromises = files.map((file) => cloudinary.uploader.upload(file.path, {
                transformation: [{
                    width: 480,
                    height: 360,
                    crop: 'fill'
                }]
            }));
            const uploadResults = await Promise.all(uploadPromises);

            const secure_urls = uploadResults.map(result => result.secure_url);
            console.log('Uploaded URLs:', secure_urls);
            req.body.image = secure_urls;
        }

        const {lat, lng}= req.body;
        if(lat && lng){
            req.body.location= { type:'Point', coordinates:[Number(lng),Number(lat)]}  ;
        }
        
        const shop = await Shop.findByIdAndUpdate(req.params.shopId, req.body, { new: true });
        if (!shop) return res.status(404).json({ message: 'Shop not found' });
        shop.updatedAt = new Date();
        shop.save();
        return res.json(shop);
    } catch (error) {
        console.error('Error updating shop:', error);
        return res.status(500).json({ error: error });
    }
}

export const deleteShop = async (req: Request, res: Response): Promise<any> => {
    try {
        const shop = await Shop.findByIdAndDelete(req.params.shopId);
        if (!shop) return res.status(404).json({ message: 'Shop not found' });
        return res.json({ message: 'Shop deleted successfully' });
    } catch (error) {
        console.error('Error deleting shop:', error);
        return res.status(500).json({ error: error });
    }
}

export const findShopByLocation= async(req:Request, res:Response): Promise<any>=>{
    try {
        const {lng,lat}=req.body;
        const coordinates= [lng,lat];
        console.log(coordinates);
        if(req.body){
            const shops= await Shop.find({location:{$geoWithin:{$centerSphere:[coordinates, 5/3963.2]}}})
            return res.status(200).json(shops);
        }
        else return res.status(404).json({error: "enter the coordinates"} )
       
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}