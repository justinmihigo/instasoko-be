import {Router} from 'express'
import { createNotification, getAllNotifications } from '../controllers/Notification.controller';

const router= Router();

router.post('/:senderId/createNotification/:recieverId',createNotification);
router.get('/getNotifications/:recieverId', getAllNotifications);

export default router;