"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { FormatPrice } from "@/lib/format-price";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, clearWholeCart, handleSetPaymentIntent } = useCart();

  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = FormatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Payment Success! 😊");
          clearWholeCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
        console.log(result.error);
      });

    setIsLoading(false);
  };

  return (
    <div id="payment-form">
      <div className="mb-6">
        <h1 className="text-2xl text-slate-900 mt-5 text-center font-semibold">
          Enter payment details to complete checkout
        </h1>
      </div>
      <h2 className="font-semibold mt-4 mb-2">Shipping Address</h2>
      <AddressElement options={{ mode: "shipping" }} />
      <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="py-4 text-center text-slate-700 text-lg font-bold">
        Total: {formattedPrice}
      </div>
      <div className="mb-4">
        <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : "Complete Order"}
        </Button>
      </div>
    </div>
  );
};
