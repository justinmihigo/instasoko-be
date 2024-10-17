import { Request, Response } from "express"
import Category from "../models/Category.model"



export const createCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        if(req.body){
            const { name, hasSubCategory, parentId } = req.body;
            const newCategory = new Category({ name, hasSubCategory, parentId });
            await newCategory.save();
            return res.status(201).json({ message: "Category created successfully", newCategory });
        }
    } catch (error) {
        res.status(500).json(error);
    }

}
export const getAllCategories = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const categories = await Category.find();
        return res.status(200).json(categories);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

export const getCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const categoryId = req.params.id as string;
        const category = await Category.findOne({ _id: categoryId });
        return res.status(200).json(category);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

export const deleteCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const CategoryId = req.params.id as string;
        const category = await Category.deleteOne({ _id: CategoryId });
        return res.status(201).json({ message: "The Category has been deleted successfully", category });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

export const updateCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        if(req.body){
            const { name, hasSubCategory, parentId } = req.body;
            const newCategory = new Category({ name, hasSubCategory, parentId });
            await newCategory.save();
            return res.status(201).json({ message: "Category created successfully", newCategory });
        }
    } catch (error) {
        res.status(500).json(error);
    }

}


