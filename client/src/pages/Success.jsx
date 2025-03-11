import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart } from '../store/UserSlice';
import { ClearCart } from '../apicalls/user';
import { useNavigate, useLocation } from 'react-router-dom';
import { message, Spin } from 'antd';
import { RetreiveSession } from '../apicalls/payment'; 
const Success = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useSelector((state) => state.user.id);
    const [isLoading, setIsLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

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

    const handleRetreiveSession = async () => {
      const sessionId = new URLSearchParams(location.search).get('session_id');
            if (sessionId) {
              try {
                const response = await RetreiveSession(sessionId);
                if (response.success) {
                  setOrderDetails(response.data);  
                } else {
                  message.error(response.message); 
                }
              } catch (error) {
                message.error('Error fetching session Data'); 
                console.error('Error fetching session data:', error);
              }
            }
    }
    useEffect(() => {
            handleRetreiveSession();
            clearCartAfterPayment();
        }, [location]);

    

    if (!orderDetails) {
      return <p>Loading...</p>;
  }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {isLoading ? (
                <Spin size="large" tip="Processing..." />
            ) : (
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You for Your Purchase!</h1>
                    <p className="text-xl text-gray-600">Your payment was successful. Your order is being processed.</p>
                    <div>
                      <h2>Order Summary:</h2>
                      <ul>
                          {orderDetails.items.map((item, index) => (
                              <li key={index}>{item.name} - ₹{item.amount}</li>
                          ))}
                      </ul>
                      <h3>Total: ₹{orderDetails.totalAmount}</h3>
                  </div>
                </div>
            )}
        </div>
    );
};

export default Success;
