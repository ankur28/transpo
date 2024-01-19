import React, { useContext, useState } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { UserSelectedAmountContext } from "@/context/UserSelectedAmountContext";
import Link from "next/link";

function Booking() {
  const [amount, setAmount] = useState()
  const router:any = useRouter()
  const { carAmount, setCarAmount } = useContext(UserSelectedAmountContext);

  return (
    <div className="p-5">
      <h1 className="text-[20px] font-semibold ">Booking</h1>
      <div className="border-[1px] dark:border-gray-500 p-5 rounded-md">
        <AutoCompleteAddress />
        <Cars onCarSelectAmount={(amount:any)=> setAmount(amount)} />
        <Cards />
        <button className={`w-full  p-1 rounded-md mt-4 text-black 
        transition ease-in-out delay-150 
        ${!carAmount ? 'bg-gray-100': 'bg-yellow-500'}
        `}
        disabled={!carAmount}
        onClick={() => {
          console.log(carAmount)
          router.push('/payment')
          }}>
          Book
        </button>
        {/* <Link className={`w-full  p-1 rounded-md mt-4 text-black
        ${!carAmount ? 'bg-gray-100': 'bg-yellow-500'}
        `}
        href={{
          pathname: '/payment',
          query: {
            amount: carAmount
          }
        }}
      >
        Book
      </Link> */}
      </div>
    </div>
  );
}

export default Booking;
