import {Schema, Types, model} from "mongoose"
import { Inotification } from "../types/notification.type"

const notificationSchema= new Schema<Inotification>({
    senderId: {type: Types.ObjectId, ref: 'User'},
    receiverId: {type: Types.ObjectId, ref: 'User'},
    message: {type: String},
    type: {type: String, enum: ['success', 'warning', 'error'], default:'success'},
    timestamp: {type: Date, default: Date.now()}

});
export default model('Notification',notificationSchema);