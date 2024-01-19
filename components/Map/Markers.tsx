import React, { useContext } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { UserLocationContext } from "@/context/UserLocationContext";
import { FromCoordinatesContext } from "@/context/FromCoordinatesContext";
import { ToCoordinatesContext } from "@/context/ToCoordinatesContext";

function Markers() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { fromCoordinates, setCromCoordinates } = useContext(
    FromCoordinatesContext
  );
  const { toCoordinates, setToCoordinates } = useContext(ToCoordinatesContext);

  return (
    <div>
      <Marker
        longitude={userLocation?.lon}
        latitude={userLocation?.lat}
        anchor="bottom"
      >
        <img className="w-20 h-20" src="./pin.png" />
      </Marker>

      {/*  From Marker */}
      {fromCoordinates.length!=0 ?
       <Marker longitude={fromCoordinates?.lng} latitude={fromCoordinates?.lat} anchor="bottom">
       <img
       className="w-20 h-20"
       src="./pin.png" />
     </Marker> : null}

      {/*  To Marker */}
      {toCoordinates.length!=0 ?
       <Marker longitude={toCoordinates?.lng} latitude={toCoordinates?.lat} anchor="bottom">
       <img
       className="w-20 h-20"
       src="./pin.png" />
     </Marker> : null}
    </div>
  );
}

export default Markers;
