import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addtoCart, removefromCart, deletefromCart } from '../store/UserSlice';
import { Layout, Typography, Button, Radio } from 'antd';
import { DeleteOutlined,PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;


const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.user.cart);
    const products = useSelector((state) => state.product.fetchProduct);
    const [position, setPosition] = useState('end');
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

    useEffect(() => {
        const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);
        setTotal(totalAmount);
    }, [cartItems]);


    const handleAddtoCart = (id) => {
        dispatch(addtoCart(id));
    }
    const handleRemovefromCart = (id) => {
        dispatch(removefromCart(id));
    }
    const handleDeletefromCart =(id) => {
        dispatch(deletefromCart(id));
    }
    const handleNavigateOrderSummary = () => {
        if(cartItems.length != 0)
        navigate('/ordersummary');
    };
    
    useEffect(() => {
    }, [cart]);

    return (
        <Layout className="min-h-screen bg-gray-100 mt-[55px]">

            <Header className="bg-slate-200 text-white text-center py-4">
                <Title level={3} className="text-white">Congratulations on Free Shipping!</Title>
            </Header>

            <Content className="flex justify-center items-center bg-gray-100 py-6">
                <div key="carts" className="container mx-auto px-4">
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
                                        className="w-40 h-40 object-cover rounded-md"
                                    />
                                </div>
                                <div className="flex-1 px-8">
                                    <div className="text-2xl font-semibold">{item.name}</div>
                                    <div className="text-xs font-normal mt-2">{item.description}</div>
                                </div>
                                <div className="text-sm font-light">₹{item.price}</div>
                                <div className="text-sm font-light">x{item.quantity}</div>
                                <div className="flex flex-col justify-between items-center w-56">
                                    <Radio.Group value={position}  onChange={(e) => setPosition(e.target.value)}>
                                    <Radio.Button value="start" onClick={() => handleAddtoCart(item.productId)}><PlusOutlined/></Radio.Button>
                                    <Radio.Button value="end" onClick={()=>handleRemovefromCart(item.productId)}><MinusOutlined/></Radio.Button>
                                    <Button
                                        onClick={()=>handleDeletefromCart(item.productId)}
                                        danger
                                        size="medium"
                                        className="mx-4"
                                        >
                                        <DeleteOutlined />
                                    </Button>
                                    </Radio.Group>
                                </div>
                                <div className="text-sm font-light">₹{item.totalPrice}</div>
                                
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
                    onClick={handleNavigateOrderSummary}
                    type="primary"
                    size="large"
                    className="w-full sm:w-auto"
                    disabled={cartItems.length === 0}
                >
                    Place Order
                </Button>
            </Footer>
        </Layout>
    );
};

export default Cart;
