import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Typography, Button, Form,  Input } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from '../apicalls/payment';
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const stripekey = import.meta.env.VITE_REACT_APP_API_KEY;
const stripePromise = loadStripe(stripekey);

const Checkout = () => {
        const cart = useSelector((state) => state.user.cart);
        const products = useSelector((state) => state.product.fetchProduct);
        const user = useSelector((state)=> state.user);
        const [form] = Form.useForm();
        const [total, setTotal] = useState(0);
        const [deliveryDetails, setDeliveryDetails] = useState({
                        name: user.name,
                        email: user.email,
                        phone_number: user.phone_number,
                        address: user.address,
        });

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
                const { sessionId } = await createCheckoutSession({ cart: cartItems, customerDetails: deliveryDetails });
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({ sessionId });
                if (error) {
                    console.error("Error redirecting to checkout:", error);
                }
            } catch (err) {
                console.error('Error during checkout session creation:', err);
            }
        };
        
        const handleFormChange = (Values) => {
            setDeliveryDetails(Values);
            console.log('Received values of form: ', Values);
        };

        useEffect(() => {
                const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);
                setTotal(totalAmount);
            }, [cartItems]);

        useEffect(() => {
            setDeliveryDetails({
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                address: user.address,
            });
        }, [user]);

  return (
        <Layout className="min-h-screen bg-gray-100 mt-[55px]">

            <Header className="bg-slate-200 text-center py-4">
                <Title level={3} >Order Summary</Title>
            </Header>

            <Content className="flex bg-gray-100 py-6">
                <div className=' container flex flex-col items-end mx-auto px-4 pt-4 w-1/2'>
                <div className='text-xl mb-4 '> Shipping Details </div>
                <Form
                    form={form}
                    initialValues={{
                        name: user.name,
                        email: user.email,
                        phone_number: user.phone_number,
                        address: user.address,
                      }}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                    onValuesChange={handleFormChange}
                    >
                    <Form.Item name="name" label="Name">
                    <Input placeholder="Enter Full Name"/>
                    </Form.Item>
                    <Form.Item name="email" label="E-mail">
                    <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item name="phone_number" label="PhoneNumber">
                    <Input placeholder="Add Phone Number"/>
                    </Form.Item>
                    <Form.Item name="address" label=" Delivery Address">
                    <TextArea placeholder="Add Address with pincode"rows={4} />
                    </Form.Item>
                </Form>       
                </div>

                <div key="carts" className="container flex flex-col mx-auto px-4 pt-4 w-1/2">
                <div className='text-xl  '> Order Items </div>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            
                            <div
                                key={item._id} 
                                className="flex items-center space-x-4 my-4 p-4 bg-white rounded-lg shadow-md max-w-[480px]"
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

export default Checkout