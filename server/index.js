import express from 'express'
import cors from 'cors'
import { connection } from './config/dbConfig.js'
import { userRoute } from './route/userRoute.js'
import { productRoute } from './route/productRoute.js'
import { uploadRoute } from './route/uploadRoute.js'
import { paymentRoute } from './route/paymentRoute.js';
import 'dotenv/config'

// Configuration
const app = express();
const port = process.env.PORT || 5000;
// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Database Connection
connection();

// API's
app.use("/api/user",userRoute);
app.use("/api/product",productRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/payment',paymentRoute);

app.listen(port,() =>{
    console.log(`Server listening on http://localhost:${port}`);
});