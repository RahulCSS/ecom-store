import express from 'express';
import { loginUser,registerUser, getCurrentUser} from '../controller/userController.js';
import authMidlleware from '../middleware/authMiddleware.js';
const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/getcurrentuser',authMidlleware, getCurrentUser);

export { userRouter };