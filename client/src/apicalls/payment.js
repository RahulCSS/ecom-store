import {axiosInstance} from ".";

//Stripe Payment Session
export const createCheckoutSession = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/payment/create-checkout-session", { payload });
    return response.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};


export const RetreiveSession = async (payload) => {
  try {
    const response = await axiosInstance.get(`/api/payment/session/${payload}`);
    return response.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}