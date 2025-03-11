import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart } from '../store/UserSlice';
import { ClearCart } from '../apicalls/user';
import { useNavigate, useLocation } from 'react-router-dom';
import { message, Spin } from 'antd';

const Success = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useSelector((state) => state.user.id);
    const [isLoading, setIsLoading] = useState(false);

    const clearCartAfterPayment = async () => {
      setIsLoading(true);
      try {
        const response = await ClearCart(id);  
        if (response.success) {
          dispatch(emptyCart());  
        } else {
          message.error(response.message); 
        }
      } catch (error) {
        message.error('Failed to clear the cart.'); 
        console.error('Error during cart clearing:', error); 
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
            const sessionId = new URLSearchParams(location.search).get('session_id');
            console.log(sessionId);
            if (sessionId) {
                fetch(`/api/payment/session/${sessionId}`)
                    .then(res => res.json())
                    .then(data => setOrderDetails(data))
                    .catch(err => console.error('Error fetching order details:', err));
            }
        }, [location]);

    useEffect(() => {
      clearCartAfterPayment();
    }, [dispatch, id, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {isLoading ? (
                <Spin size="large" tip="Processing..." />
            ) : (
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You for Your Purchase!</h1>
                    <p className="text-xl text-gray-600">Your payment was successful. Your order is being processed.</p>
                </div>
            )}
        </div>
    );
};

export default Success;
