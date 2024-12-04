import express from 'express'
import cors from 'cors'
import { connection } from './config/dbConfig.js'
import { userRouter } from './route/userRoute.js'

import 'dotenv/config'

// Configuration
const app = express();
const port = 8082;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connection();

// API's
app.use("/api/user",userRouter);


app.listen(port,() =>{
    console.log(`Server listening on http://localhost:${port}`);
});