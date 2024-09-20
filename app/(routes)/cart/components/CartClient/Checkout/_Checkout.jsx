import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import useCart from "@/hooks/useCartStore";
import { processOrder } from '@/utils/orderProcessing';
import CustomerInfoStep from './customer-info-step';
import OrderSummaryStep from './order-summary-step';
import CheckoutReview from './CheckoutReview/_CheckoutReview';
import { useRouter } from 'next/navigation';


export default function Checkout() {
  const [step, setStep] = useState('cart');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });
  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    if (cart.items.length === 0 && step !== 'cart') {
      setStep('cart');
      toast.error("Your cart is empty. Please add items before checkout.");
    }
  }, [cart.items, step]);

  const totalPrice = cart.items.reduce((total, item) => total + Number(item.price) * item.count, 0);

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    if (method === 'stripe') {
      processOrder.initiateStripeCheckout();
    } else {
      setStep('customer-info');
    }
  };

  const handleCustomerInfoSubmit = (data) => {
    setCustomerInfo(data);
    setStep('order-summary');
  };

  const handlePlaceOrder = () => {
    if (!customerInfo.name) {
      toast.error("Customer information is missing. Please fill out the form.");
      setStep('customer-info');
      return;
    }

    const orderData = {
      customerInfo,
      items: cart.items.map(item => ({
        id: item.id,
        count: item.count,
        price: item.price,
      })),
      totalPrice,
      paymentMethod,
    };

    processOrder.placeOrder(orderData, paymentMethod, router, cart);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Checkout</h1>
      {step === 'cart' && (
        <CheckoutReview
          cart={cart} 
          totalPrice={totalPrice} 
          onPaymentMethodSelect={handlePaymentMethodSelect}
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
        />
      )}
      {step === 'customer-info' && (
        <CustomerInfoStep 
          onSubmit={handleCustomerInfoSubmit}
          customerInfo={customerInfo} // Pass current customer info
          onBack={() => setStep('cart')}
        />
      )}
      {step === 'order-summary' && (
        <OrderSummaryStep 
          cart={cart}
          customerInfo={customerInfo}
          totalPrice={totalPrice}
          paymentMethod={paymentMethod}
          onPlaceOrder={handlePlaceOrder}
          onBack={() => setStep('customer-info')}
        />
      )}
    </div>
  );
}