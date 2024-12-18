import express from 'express';
import { createCheckoutSession } from '../controller/paymentController.js';

const paymentRoute = express.Router();

paymentRoute.post('/create-checkout-session', createCheckoutSession);
export { paymentRoute };
