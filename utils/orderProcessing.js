import axios from 'axios';
import { toast } from 'sonner';

// Adjusted orderProcessing.js
export const processOrder = {
  initiateStripeCheckout: async (orderData) => {
    console.log('Initiating Stripe checkout for:', orderData);
    toast.success("You would now be redirected to Stripe to complete your payment.");
    // Implement Stripe checkout logic here
  },

  processCashOnDeliveryOrder: async (orderData, cart, setStep) => {  // Pass router and cart
    const toastId = toast.loading("Please be patient, your order is being processed");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, orderData);
      toast.success("Your order has been placed using Cash on Delivery.");
      handleSuccessfulOrder(cart,setStep);  
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Server Error: Unable to process the request");
      }
    } finally {
      toast.dismiss(toastId);
    }
  },

  placeOrder: (orderData, paymentMethod, router, cart) => {  // Pass router and cart here as well
    if (paymentMethod === 'stripe') {
      processOrder.initiateStripeCheckout(orderData);
    } else {
      processOrder.processCashOnDeliveryOrder(orderData, router, cart);  // Pass router and cart
    }
  }
};

// handleSuccessfulOrder now receives router and cart as arguments
const handleSuccessfulOrder = (cart,setStep) => {
  // Clear the cart
  cart.removeAll();
  setStep("order-confirmation")
};