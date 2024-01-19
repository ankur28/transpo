import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { FromCoordinatesContext } from "@/context/FromCoordinatesContext";
import { ToCoordinatesContext } from "@/context/ToCoordinatesContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapboxRoute from "./MapboxRoute";
import ShowDistance from "./ShowDistance";

function Mapbox() {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { fromCoordinates, setCromCoordinates } = useContext(
    FromCoordinatesContext
  );
  const { toCoordinates, setToCoordinates } = useContext(ToCoordinatesContext);
  const { directionData, setDirectionData } = useContext(DirectionDataContext);

  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (fromCoordinates) {
      mapRef.current?.flyTo({
        center: [fromCoordinates.lng, fromCoordinates.lat],
        duration: 2500,
      });
    }
  }, [fromCoordinates]);

  useEffect(() => {
    if (toCoordinates) {
      mapRef.current?.flyTo({
        center: [toCoordinates.lng, toCoordinates.lat],
        duration: 2500,
      });
    }
    if (fromCoordinates && toCoordinates) {
      console.log(fromCoordinates);
      console.log(toCoordinates);
      getDirectionRoute();
    }
  }, [toCoordinates]);

  const MAPBOX_DRIVING_ROUTES =
    "https://api.mapbox.com/directions/v5/mapbox/driving/";
  const session_token = "86683ef2-b9c9-4ecd-8d16-09e25cdf3aef";

  const getDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_DRIVING_ROUTES +
        fromCoordinates.lng +
        "," +
        fromCoordinates.lat +
        ";" +
        toCoordinates.lng +
        "," +
        toCoordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    setDirectionData(result);
    console.log("routes", result);
  };

  return (
    <div className=" p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lon,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 680, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
            {directionData?.routes ? (
              <MapboxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      <div
        className="absolute z-20 hidden md:block bottom-[15px]
      right-[20px]"
      >
        <ShowDistance />
      </div>
    </div>
  );
}

export default Mapbox;
