"use client";
import Booking from "@/components/Booking/Booking";
import Mapbox from "@/components/Map/Mapbox";
import { ToCoordinatesContext } from "@/context/ToCoordinatesContext";
import { FromCoordinatesContext } from "@/context/FromCoordinatesContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { useEffect, useState } from "react";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { UserSelectedAmountContext } from "@/context/UserSelectedAmountContext";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  const [fromCoordinates, setFromCoordinates] = useState<any>([]);
  const [toCoordinates, setToCoordinates] = useState<any>([]);
  const [directionData, setDirectionData] = useState<any>([]);
  const [carAmount, setCarAmount] = useState<any>();

  console.log('from Home', typeof(carAmount), carAmount)
  useEffect(() => {
    getUserLocation();
  });

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  };

  return (
    <div className="">
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <FromCoordinatesContext.Provider
          value={{ fromCoordinates, setFromCoordinates }}
        >
          <ToCoordinatesContext.Provider
            value={{ toCoordinates, setToCoordinates }}
          >
            <DirectionDataContext.Provider value={{directionData,setDirectionData}}>
             <UserSelectedAmountContext.Provider value={{carAmount, setCarAmount}}>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div>
                  <Booking />
                </div>
                <div className="col-span-2  ">
                  <Mapbox />
                </div>
              </div>
              </UserSelectedAmountContext.Provider> 
            </DirectionDataContext.Provider>
          </ToCoordinatesContext.Provider>
        </FromCoordinatesContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
