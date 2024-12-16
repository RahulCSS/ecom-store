import express from 'express';
import { loginUser,registerUser, getCurrentUser, updateCart, updateWishlist} from '../controller/userController.js';
import authMidlleware from '../middleware/authMiddleware.js';
const userRoute = express.Router();

userRoute.post('/register',registerUser);
userRoute.post('/login',loginUser);
userRoute.get('/getcurrentuser',authMidlleware, getCurrentUser);
userRoute.put('/updatecart/:id',updateCart);
userRoute.put('/updatewishlist/:id',updateWishlist);

export { userRoute };