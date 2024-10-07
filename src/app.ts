import express, {Express} from 'express';
import bodyParser from "body-parser";
import { config } from 'dotenv';
config();
const app:Express = express();
app.use(express.json());
app.use(bodyParser.json());
try {
    app.listen(3000);
    console.log("Server is running on port 3000");
    
} catch (error) {
    console.log("Error: ", error);
}

export default app;



