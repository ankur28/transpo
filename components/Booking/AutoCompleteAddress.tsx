import { ToCoordinatesContext } from "@/context/ToCoordinatesContext";
import { FromCoordinatesContext } from "@/context/FromCoordinatesContext";
import React, { useContext, useEffect, useState } from "react";

const session_token = 'c53384d9-8a5f-4bdb-986a-1633a83fa248'
const MAPBOX_RETRIEVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/'

function AutoCompleteAddress() {
  
  const [fromAddress, setFromAddress] = useState<any>();
  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);
  const [addressList, setAddressList] = useState<any>([]);
  const [destination, setDestination] = useState<any>();
  const {fromCoordinates, setFromCoordinates} = useContext(FromCoordinatesContext)
  const {toCoordinates, setToCoordinates} = useContext(ToCoordinatesContext)

  const fetchAddress = async () => {
    setAddressList([]);
    const query = sourceChange ? fromAddress : destination;

    const res = await fetch(`/api/search-address?q=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setAddressList(result);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAddress();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [fromAddress, destination]);


  const setFromAddressClick = async (item:any) => {
    setFromAddress(item.full_address);
    setAddressList([]);
    setSourceChange(false);
    const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id + "?session_token="+session_token+"&access_token="+process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)
    const result = await res.json()

    setFromCoordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1]
    })
    console.log(fromCoordinates)

  }
  const setToAddressClick = async (item:any) => {
    setDestination(item.full_address);
    setAddressList([]);
    setDestinationChange(false);
    const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id + "?session_token="+session_token+"&access_token="+process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)
    const result = await res.json()

    setToCoordinates({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1]
    })

  }


  return (
    <div>
      <div className="mt-5 relative">
        <label className="text-gray-400">Where from?</label>
        <div className="flex">
          <input
            type="text"
            onChange={(e) => {
              setFromAddress(e.target.value);
              setSourceChange(true);
            }}
            value={fromAddress}
            className="bg-white dark:bg-black p-1 w-full border-[1px] 
                rounded-md outline-none focus:border-yellow-500 dark:border-gray-500"
          />

          <button
            className="mt-1 px-2  rounded-md absolute right-1 bg-white dark:bg-black  text-gray-300 hover:text-yellow-500"
            onClick={() => {
              setAddressList([]);
              setSourceChange(false);
              setFromAddress("");
            }}
          >
            x
          </button>
        </div>
        {addressList?.suggestions && sourceChange ? (
          <div className="dark:bg-black bg-white   shadow-md rounded-md p-1 w-full">
            
            {addressList?.suggestions.map((item: any, index: number) => (
              <h2
                className="p-3 hover:bg-gray-100 cursor-pointer hover:dark:bg-gray-500"
                onClick={() => setFromAddressClick(item) }
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-3 relative ">
        <label className="text-gray-400">Where to?</label>
        <div className=" flex">
          <input
            type="text"
            onChange={(e) => {
              setDestination(e.target.value);
              setDestinationChange(true);
            }}
            value={destination}
            className="bg-white dark:bg-black p-1 w-full border-[1px]
                rounded-md outline-none focus:border-yellow-500 dark:border-gray-500"
          />
          <button
            className="mt-1 px-2  rounded-md absolute right-1 bg-white dark:bg-black  text-gray-300 hover:text-yellow-500"
            onClick={() => {
              setAddressList([]);
              setDestinationChange(false);
              setDestination("");
            }}
          >
            x
          </button>
        </div>
        {addressList?.suggestions && destinationChange ? (
          <div className="dark:bg-black bg-white  shadow-md rounded-md p-1 w-full">
            {addressList?.suggestions.map((item: any, index: number) => (
              <h2
                className="p-3 hover:bg-gray-100 cursor-pointer hover:dark:bg-gray-500 "
                onClick={() =>setToAddressClick(item) }
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AutoCompleteAddress;
