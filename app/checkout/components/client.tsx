"use client";

import { useCart } from "@/hooks/use-cart";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { ImSpinner2 } from "react-icons/im";
import { CheckoutForm } from "./checkout-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const CheckoutClient = () => {
  const router = useRouter();
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    console.log("cartProducts", cartProducts);
    if (!cartProducts || paymentSuccess) return;

    setIsLoading(true);
    setError(false);

    console.log("called checkout client + create-payment-intent");

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartProducts,
        payment_intent_id: paymentIntent,
      }),
    })
      .then((res) => {
        setIsLoading(false);
        if (res.status === 401) {
          return router.push("/login");
        }

        return res.json();
      })
      .then((data) => {
        setClientSecret(data.paymentIntent.client_secret);
        handleSetPaymentIntent(data.paymentIntent.id);
      })
      .catch((error) => {
        setError(true);
        toast.error("Something went wrong!");
      });
  }, [
    cartProducts,
    handleSetPaymentIntent,
    paymentIntent,
    paymentSuccess,
    router,
  ]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  return (
    <div className="w-full">
      {clientSecret && cartProducts && !paymentSuccess && !error && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={setPaymentSuccess}
          />
        </Elements>
      )}
      {isLoading && (
        <div className="text-3xl flex flex-col items-center justify-center w-full h-full gap-3">
          <h1>Loading Checkout...</h1>
          <ImSpinner2 className="animate-spin" />
        </div>
      )}
      {error && (
        <div className="text-3xl flex items-center justify-center w-full h-full text-rose-500">
          <h1>Something went wrong! 😟</h1>
        </div>
      )}

      {paymentSuccess && (
        <div className="text-3xl flex flex-col items-center justify-center w-full h-full gap-4">
          <div>
            <h1 className="flex items-center gap-2">
              Payment Success
              <span>
                <AiOutlineCheckCircle className="text-green-500" />
              </span>
            </h1>
          </div>
          <div>
            <Button onClick={() => router.push("/order")}>
              View your orders
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
