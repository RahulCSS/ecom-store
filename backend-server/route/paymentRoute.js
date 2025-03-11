import express from 'express';
import { createCheckoutSession , retreiveSession } from '../controller/paymentController.js';

const paymentRoute = express.Router();

paymentRoute.post('/create-checkout-session', createCheckoutSession);
paymentRoute.get('/session/:sessionId', retreiveSession)
export { paymentRoute };
