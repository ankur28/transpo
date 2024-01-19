import { UserSelectedAmountContext } from "@/context/UserSelectedAmountContext";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import React, { useContext } from "react";

function CheckoutForm() {
  const stripe: any = useStripe();
  const elements = useElements();
   const { carAmount, setCarAmount } = useContext(UserSelectedAmountContext) || {};

  const handleSubmit = async (event: any) => {
    if (elements == null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }

    const response = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({ amount: carAmount }),
    });
    const SecretKey = await response.json();
    const { error } = await stripe.confirmPayment({
      clientSecret: SecretKey,
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/",
      },
    });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
        <form className="border-[1px] p-10 rounded-lg" onSubmit={handleSubmit}>
            <h2>Please complete this form in order to make payment</h2>
          <PaymentElement />
          <button
            className="bg-yellow-500 w-full p-3 rounded-lg mt-8"
            type="submit"
            disabled={!stripe || !elements}
          >
            Pay
          </button>
        </form>
    </div>
  );
}

export default CheckoutForm;
