import mongoose from "mongoose"
import Product from "../models/Product.model"
import { Request, Response } from "express"
import cloudinary from "../utils/cloudinary"
// import { writeFile } from "fs/promises"
// import fs from "fs"
// import path from "path"
// import { fsync } from "fs"


export const createProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const shopId = req.params.shopId
        const files = req.files as Express.Multer.File[];
        if (!files || files.length == 0) {
            return res.status(404).json({ message: "Enter at least one image" });
        }
        // const processedImages = await Promise.all(files.map(async (file) => {
        //     const dataURL = await removeBg(file.path);
        //     const base64Data = dataURL.replace("data:image/png;base64", "");
        //     const buffer = Buffer.from(base64Data, 'base64');
        //     const tempFilePath = path.join('./public', `${Math.floor(Math.random() * 1000) + 5}.png`);
        //     await writeFile(tempFilePath, buffer);
        //     return tempFilePath;
        // }));
        // console.log(processedImages);
        const uploadPromises = files.map((file) =>
            cloudinary.uploader.upload(file.path, {
                transformation: [{
                    width: 480,
                    height: 360,
                    crop: 'fill'
                }]
            })
        );
        const uploadResults = await Promise.all(uploadPromises);
        const secure_urls = uploadResults.map(result => result.secure_url);
        console.log('Uploaded URLs:', secure_urls);
        const { lat, lng } = req.body as any;
        const coordinates: number[] = [Number(lng), Number(lat)]

        const owner = new mongoose.Types.ObjectId(shopId);
        const productData: any = {
            ...req.body,
            shopId: owner,
            location: { type: 'Point', coordinates: coordinates },
            images: secure_urls
        };
        if (req.body) {
            const product = new Product(productData);
            await product.save();
            res.status(200).json(product);
        }
        else {
            return res.status(400).json({ message: "error creating product" });
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }


}
export const getAllProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const shopId = req.params.shopId;
        const products = await Product.find({ shopId: shopId });
        return res.status(200).json(products);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

export const getProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const shopId = req.params.shopId;
        const productId = req.params.id as string;
        const products = await Product.findOne({ _id: productId, shopId }).populate('shopId', 'name address');
        return res.status(200).json(products);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const productId = req.params.id as string;
        const product = await Product.deleteOne({ _id: productId });
        return res.status(201).json({ message: "The product has been deleted successfully", product });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const shopId = req.params.shopId
        const productId = req.params.id
        const files = req.files as Express.Multer.File[];
        if (files) {
            // const processedImages = await Promise.all(files.map(async (file) => {
            //     const dataURL = await removeBg(file.path);
            //     const base64Data = dataURL.replace("data:image/png;base64", "");
            //     const buffer = Buffer.from(base64Data, 'base64');
            //     const tempFilePath = path.join('./public', `${Math.floor(Math.random() * 1000) + 5}.png`);
            //     await writeFile(tempFilePath, buffer);
            //     return tempFilePath;
            // }));
            // console.log(processedImages);
            const uploadPromises = files.map((file) =>
                cloudinary.uploader.upload(file.path, {
                    transformation: [{
                        width: 480,
                        height: 360,
                        crop: 'fill'
                    }]
                })
            );
            const uploadResults = await Promise.all(uploadPromises);
            const secure_urls = uploadResults.map(result => result.secure_url);
            console.log('Uploaded URLs:', secure_urls);
            req.body.images = secure_urls;
        }
        const { lat, lng } = req.body;
        if (lat && lng) {
            req.body.location = { type: 'Point', coordinates: [Number(lng), Number(lat)] };
        }

        if (req.body) {
            const product = await Product.findByIdAndUpdate({ _id: productId }, req.body, { new: true });
            res.status(200).json(product);
        }
        else {
            return res.status(400).json({ message: "error creating product" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }


}

export const findProductByLocation = async (req: Request, res: Response): Promise<any> => {
    try {
        const { lng, lat, name } = req.body;
        const coordinates = [lng, lat];
        const radiusInMiles = [1, 3, 5];
        console.log(coordinates);
        if (req.body) {
            for (const radius of radiusInMiles) {
                console.log("the current radius is ", radius)
                const products = await Product.aggregate([
                    {
                        $search: {
                            index: "productSearch",
                            text: {
                                query: name,
                                path: {
                                    wildcard: "*"
                                }
                            }
                        }
                    },

                    {
                      $match: {
                        location: {
                          $geoWithin: {
                            $centerSphere: [coordinates, 5 / 3963.2]
                          }
                        }
                      }
                    }
                ]).limit(10);
                if (products.length !== 0) {
                    console.log('aggreage')
                    return res.status(200).json(products);
                }
                else {
                    const products = await Product.find({
                        name: { $regex: name, $options: 'i' },
                        location:
                        {
                            $geoWithin: {
                                $centerSphere: [coordinates, 5 / 3963.2]
                            }
                        }
                    }).limit(10);
                    if (products.length !== 0) {
                        return res.status(200).json(products);
                    }
                    else {
                        const finalSearch = await Product.aggregate([{
                            $search: {
                                index: "productSearch",
                                text: {
                                    query: name,
                                    path: {
                                        wildcard: "*"
                                    }
                                }
                            }
                        }]).limit(10);
                        return res.status(404).json({ message: 'No products found', finalSearch });
                    }
                }
            }

        }
        else return res.status(404).json({ error: "enter the coordinates" })

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }

}

