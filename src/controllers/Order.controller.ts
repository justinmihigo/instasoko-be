import Order from "../models/Order.model";
import { Request, Response } from 'express';


export const createOrder = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId= req.params.id;
        if (req.body){
            const { items, totalAmount, status, shippingAddress, paymentMethod, paymentStatus } = req.body;
            
            const newOrder = new Order({ userId, items, totalAmount });
            await newOrder.save();
            res.status(201).json({ newOrder: newOrder });
        }
        else{
            return res.status(400).json({ message: 'No order data provided' });
        }
        
    } catch (error) {
        res.status(400).json({ error });
    }

}

export const getOrders = async (req: Request, res: Response) => {
    try {
        const users = await Order.find().populate("items.productId","name color");
        res.status(200).json({ users: users });
    }
    catch (error) {
        res.status(400).json(error);
    }
}

export const getOrderById = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await Order.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(400).json(error);
    }
}

export const updateOrder = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const updatedUser = await Order.findByIdAndUpdate(id, req.body, {
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

export const deleteOrder = async (req: Request, res: Response):Promise<any> => {

    try {
        const id = req.params.id;
        const userDelete = await Order.findByIdAndDelete(id);
        if (!userDelete) return res.status(404).json({ message: "User not found" });
        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
}