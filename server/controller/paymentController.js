import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
    const { cart } = req.body.cart; 
    if (!Array.isArray(cart)) {
        return res.status(400).send({ error: 'Cart is not an array or is missing' });
      }
    const lineItems = cart.map((item) => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: item.name,
                images: [item.imageUrl],
            },
            unit_amount: Math.round(item.price * 100), 
        },
        quantity: item.quantity,
    }));
    console.log(lineItems);
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.SUCCESS_URL}`,
        cancel_url: `${process.env.CANCEL_URL}`,

    });
    console.log(session);

    res.send({ sessionId: session.id });
} catch (err) {
    console.error('Error creating checkout session:', err);
    res.status(500).send({ error: 'Failed to create Stripe Checkout session' });
}
};
