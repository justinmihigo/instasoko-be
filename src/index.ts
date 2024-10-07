import express, {Express} from 'express';
import bodyparser from "body-parser";
import { config } from 'dotenv';
import dbConnection from './config/db';
import router from './routes/routes';
config();
const app:Express = express();
const PORT=process.env.PORT
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

dbConnection();
try {
    app.listen(PORT,()=>{
        console.log("Server is running on port 3000");
    });
    
} catch (error) {
    console.log("Error: ", error);
    
}

export default app;
