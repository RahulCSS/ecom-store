import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Typography, Button } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from '../apicalls/payment';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const stripekey = import.meta.env.VITE_REACT_APP_API_KEY;
const stripePromise = loadStripe(stripekey);

const OrderSummary = () => {
        const cart = useSelector((state) => state.user.cart);
        const products = useSelector((state) => state.product.fetchProduct);
        const [total, setTotal] = useState(0);

        const cartItems = cart.map((cartItem) => {
            const product = products.find((prod) => prod._id === cartItem.productId);
            if (product) {
                return {
                    ...cartItem,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl[0],
                    description: product.description,
                    vendor: product.vendor_Id.name,
                    totalPrice: product.price * cartItem.quantity
                };
            }
            return null;
        }).filter(item => item !== null);
    
        const handleCheckout = async () => {
            try {
                const { sessionId } = await createCheckoutSession({ cart: cartItems });
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({ sessionId });
                if (error) {
                    console.error("Error redirecting to checkout:", error);
                }
            } catch (err) {
                console.error('Error during checkout session creation:', err);
            }
        };

        useEffect(() => {
                const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);
                setTotal(totalAmount);
            }, [cartItems]);

  return (
        <Layout className="min-h-screen bg-gray-100 mt-[55px]">

            <Header className="bg-slate-200 text-center py-4">
                <Title level={3} >Order Summary</Title>
            </Header>

            <Content className="flex justify-center items-center bg-gray-100 py-6">
                <div className='w-1/2'>

                </div>

                
                <div key="carts" className="container mx-auto px-4 w-1/2">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            
                            <div
                                key={item._id} 
                                className="flex items-center space-x-4 my-4 p-4 bg-white rounded-lg shadow-md"
                            >
                                <div className="flex-shrink-0">
                                    <img
                                        alt="product"
                                        src={item.imageUrl}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                </div>
                                <div className="flex-1 px-4">
                                    <div className="text-l font-semibold ">{item.name}</div>
                                </div>
                                <div className="text-sm font-light">₹{item.price}</div>
                                <div className="text-sm font-light">x{item.quantity}</div>
                                <div className="text-sm font-normal">₹{item.totalPrice}</div>
                                
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-xl text-gray-500">No items in the cart</p>
                    )}
                </div>
            </Content>

            <Footer className="bg-slate-300 text-black text-center py-4">
                <div className="mb-4 text-xl font-semibold">
                    Total Amount: ₹{total}
                </div>
                <Button
                    onClick={handleCheckout}
                    type="primary"
                    size="large"
                    className="w-full sm:w-auto"
                    disabled={cartItems.length === 0}
                >
                    Proceed to Checkout
                </Button>
            </Footer>
        </Layout>
  )
}

export default OrderSummary