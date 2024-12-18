import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart } from '../store/UserSlice';
import { ClearCart } from '../apicalls/user';
import { useNavigate } from 'react-router-dom';  
import { message } from 'antd'; 

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const id = useSelector((state) => state.user.id);  

  useEffect(() => {
    const clearCartAfterPayment = async () => {
      try {
        const response = await ClearCart(id);  
        if (response.success) {
          dispatch(emptyCart());  
          setTimeout(() => {
            navigate('/orders'); 
          }, 1000);
        } else {
          message.error(response.message); 
        }
      } catch (error) {
        message.error('Failed to clear the cart.'); 
        console.error('Error during cart clearing:', error); 
      }
    };

    clearCartAfterPayment();

  }, [dispatch, id, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You for Your Purchase!</h1>
        <p className="text-xl text-gray-600">Your payment was successful. Your order is being processed.</p>
      </div>
    </div>
  );
};

export default Success;
