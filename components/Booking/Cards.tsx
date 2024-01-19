import CardList from "@/data/CardList";
import Image from "next/image";
import React, { useState } from "react";

function Cards() {
    const [selectedCard, setSelectedCard] = useState<any>()

  return (
    <div className="mt-3">
      <h2 className="font-semibold text-[14px]">Payment Methods</h2>
      <div className="grid grid-cols-5 mt-2 ml-2">
        {CardList.map((item, index) => (
          <div 
          onClick={() => setSelectedCard(index)}
          className={`w-[50px] border-[1px] flex 
          items-center justify-center rounded-md
          hover:border-yellow-400
            cursor-pointer hover:scale-110 transition-allm-1
            ${ index == selectedCard ? 'border-yellow-500 border-[2px]' : null }
            `}>
            <Image src={item.image} 
            alt={item.name} width={40} height={50}
            className="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
