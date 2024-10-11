import { ObjectId } from "mongoose";

export interface Inotification{
    senderId: ObjectId,
    receiverId: ObjectId,
    message: string,
    type: 'success' | 'warning' | 'error',
    timestamp: Date,
}