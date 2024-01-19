import { DirectionDataContext } from "@/context/DirectionDataContext";
import { UserSelectedAmountContext } from "@/context/UserSelectedAmountContext";
import CarList from "@/data/CarList";
import Image from "next/image";
import React, { useContext, useState } from "react";

function Cars({ onCarSelectAmount }: any) {
  const [selectedCar, setSelectedCar] = useState<any>();
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const { carAmount, setCarAmount } = useContext(UserSelectedAmountContext);

  const getCharges = (charges: any) => {
    const calcCharge = (
      charges *
      directionData.routes[0].distance *
      0.000621371192
    ).toFixed(2);

    //toFixed returns string so converting it back to number
    const chargeInNum = parseFloat(calcCharge);
    console.log(typeof chargeInNum);
    return chargeInNum;
  };
  return  (
    <div className="mt-3  transition-all">
      <h2 className="font-semibold">Select car</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 ">
        {CarList.map((item, index) => (
          <div
            key={index}
            className={`m-2 p-2 border-[1px] rounded-md
            hover:border-yellow-500 cursor-pointer
                    ${
                      index == selectedCar
                        ? "border-yellow-500 border-[2px]"
                        : null
                    }`}
            onClick={() => {
              setSelectedCar(index);
              setCarAmount(getCharges(item.charges));
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={75}
              height={90}
              className={`w-full 
                    `}
            />
            <span className="text-[12px]">{item.name}</span>
            {directionData?.routes ? (
              <span className="float-right md:float-start font-medium">
                {getCharges(item.charges)}$
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
