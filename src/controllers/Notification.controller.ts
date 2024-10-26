import Notification from "../models/Notification.model";
import { Request, Response } from 'express';

export const createNotification = async (req: Request, res: Response) => {
    try {
        const senderId = req.params.senderId;
        const receiverId = req.params.receiverId;
        const { message, type } = req.body;
        const notification = new Notification({ senderId, receiverId, message });
        await notification.save();
        res.status(201).json({ notification });
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: error });
    }
}
export const deleteNotication = async (req: Request, res: Response) => {
    try {
        const notificationId = req.params.id;
        const deleteNotication = await Notification.deleteOne({ _id: notificationId });
        return res.status(200).json({message: "notification deleted successfully"})
    } catch (error) {
        res.status(500).json(error);
    }


}
export const getAllNotifications = async (req: Request, res: Response) => {
    try {
        const notifications = await Notification.find({ receiverId: req.params.receiverId }).populate('senderId', 'name email');
        res.json(notifications);
    } catch (error) {
        console.error('Error getting notifications:', error);
        res.status(500).json({ error: error });
    }
}
export const updateNotification = async (req: Request, res: Response) => {
    try {
        // const senderId = req.params.senderId;
        // const receiverId = req.params.receiverId;
        // const { message, type } = req.body;
        const notification = await Notification.findOneAndUpdate({_id:req.params.id}, req.body);
        res.status(201).json({ notification });
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: error });
    }
}
