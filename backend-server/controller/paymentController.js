import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
    const { cart , customerDetails } = req.body.payload;
    if (!Array.isArray(cart)) {
        return res.status(400).send({ error: 'Cart is not an array or is missing' });
      }

    const customer = await stripe.customers.create({
        name: customerDetails.name,
        email: customerDetails.email,
        phone: customerDetails.phone_number,
        address: {
            line1: customerDetails.address,
        },
    });

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
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        billing_address_collection: 'required',
        shipping_address_collection: {
            allowed_countries: ['IN'],
        },
        customer_email: customerDetails.email,
        metadata: {
            customer_name: customerDetails.name,
            customer_phone: customerDetails.phone_number,
            customer_address: customerDetails.address
        },

    });
    console.log(session);

    res.send({ sessionId: session.id });
} catch (err) {
    console.error('Error creating checkout session:', err);
    res.status(500).send({ error: 'Failed to create Stripe Checkout session' });
}
};
