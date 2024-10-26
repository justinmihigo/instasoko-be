import express, {Express, NextFunction, Request, Response} from 'express';
import bodyparser from "body-parser";
import { config } from 'dotenv';
import dbConnection from './config/db';
import router from './routes/user.routes';
import shopRoutes from './routes/shop.routes';
import notificationRoutes from  './routes/notification.routes';
import cors from 'cors';
import productRoutes from './routes/product.routes'
import upload from './config/multer';
import orderRoutes from './routes/order.routes';
import categoryRoutes from './routes/category.routes';
config();
const app:Express = express();
const PORT=process.env.PORT
app.use(express.json({limit: "50mb"}));
app.use(cors());
app.use(bodyparser.json({limit: "50mb"}));
app.use(bodyparser.urlencoded({extended:true, limit:"50mb"}));
app.use(express.urlencoded({ extended: true, limit:"50mb"}));
app.use('/users',router);
app.use('/shops', shopRoutes);
app.use('/notifications',notificationRoutes)
app.use('/products',productRoutes);
app.use('/orders', orderRoutes);
app.use('/categories', categoryRoutes)
app.use((err:any, req:any, res:any, next:any) => {
    console.error('Unhandled error:', err);
    
    if (err instanceof Error) {
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
    } else {
      console.error('Unknown error type:', JSON.stringify(err, null, 2));
    }
  
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message
    });
  });
dbConnection();
try {
    app.listen(PORT,()=>{
        console.log("Server is running on port 3000");
    });
    
} catch (error) {
    console.log("Error: ", error);
    
}

export default app;
