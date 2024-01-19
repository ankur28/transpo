"use client";
import CheckoutForm from "@/components/Payment/CheckoutForm";
import { UserSelectedAmountContext } from "@/context/UserSelectedAmountContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect } from "react";
import { useSearchParams } from 'next/navigation'

function Payment() {
  // const { carAmount, setCarAmount } =
  //   useContext(UserSelectedAmountContext) || {};
  const amountParams = useSearchParams()
  console.log(amountParams.get('amount')) 
  const amount = Number(amountParams.get('amount'))
  console.log("amount", amount, typeof(amount));
 
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any
  );
  const options: any = {
    mode: "payment",
    amount: 58,
    currency: "usd",
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}

export default Payment;
