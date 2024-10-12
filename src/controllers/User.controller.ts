import User from "../models/User.model";
import { Request, Response } from 'express';
import { signupValidator } from "../utils/validation";
import mongoose, { Types } from "mongoose";
import cloudinary from "../utils/cloudinary";

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const profilePic= req.file;
        if(profilePic){
            const result= await cloudinary.uploader.upload(profilePic.path);
            req.body.image=result.secure_url;
        }
        console.log(req.body);
        const { email, name, password, address,image, dob, uid, gender } = req.body;
        const newDob = new Date(dob);
        const { error, value } = signupValidator(req.body);
        if (error) return res.status(400).json({ error: error.message });
        const newUser = new User({ email, name,image,password, uid, address, dob: newDob, gender });
        await newUser.save();
        res.status(201).json({ newUser: newUser });
    } catch (error) {
        res.status(400).json({ error });
    }

}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json({ users: users });
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const getUserById = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(400).json(error);
    }
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const profilePic= req.file;
        if(profilePic){
            const result= await cloudinary.uploader.upload(profilePic.path);
            req.body.image=result.secure_url;
        }
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error });
    }
};

export const deleteUser = async (req: Request, res: Response):Promise<any> => {

    try {
        const id = req.params.id;
        const userDelete = await User.findByIdAndDelete(id);
        if (!userDelete) return res.status(404).json({ message: "User not found" });
        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
}