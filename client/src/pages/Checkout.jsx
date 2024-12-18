// OrderConfirmation.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const sessionId = new URLSearchParams(location.search).get('session_id');
        
        if (sessionId) {
            fetch(`/api/payment/session/${sessionId}`)
                .then(res => res.json())
                .then(data => setOrderDetails(data))
                .catch(err => console.error('Error fetching order details:', err));
        }
    }, [location]);

    if (!orderDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Order Confirmation</h1>
            <p>Thank you for your purchase! Your order has been confirmed.</p>
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
    );
};

export default Checkout;
