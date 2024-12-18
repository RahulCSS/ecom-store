import {axiosInstance} from ".";

//Stripe Payment Session
export const createCheckoutSession = async (cart) => {
  try {
    console.log("Cart Data Sent to API: ", cart);
    const response = await axiosInstance.post("/api/payment/create-checkout-session", { cart });
    return response.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};
