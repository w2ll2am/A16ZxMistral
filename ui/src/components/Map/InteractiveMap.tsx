import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

interface CameraLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

const InteractiveMap: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.GOOGLE_API_KEY || "",
  });

  const cameraLocations: CameraLocation[] = [
    { id: 1, name: "Camera 1", lat: 51.505, lng: -0.09 },
    { id: 2, name: "Camera 2", lat: 51.51, lng: -0.1 },
    { id: 3, name: "Camera 3", lat: 51.515, lng: -0.09 },
  ];

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="mt-1 pl-1 w-full relative flex flex-col break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-2">
        {/* <div className="py-4 pr-1 mb-4 bg-gradient-to-tl from-gray-900 to-slate-800 rounded-xl">
          <div className="flex mb-2">
            <div className="flex items-center justify-center w-12 h-12 mr-4 text-white rounded-lg bg-center shadow-soft-2xl bg-no-repeat bg-cover bg-gradient-to-tl from-gray-900 to-slate-800">
              <i className="fas fa-map-marker-alt text-lg"></i>
            </div>
            <div className="flex flex-col items-start">
              <h6 className="mb-0 leading-normal text-white text-size-sm">
                Interactive Map
              </h6>
              <p className="mb-0 font-semibold leading-tight text-white text-xs">
                Camera Locations
              </p>
            </div>
          </div>
        </div> */}
        <div style={{ height: "280px" }}>
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={{ lat: 51.505, lng: -0.09 }}
            zoom={13}
          >
            {cameraLocations.map((camera) => (
              <Marker
                key={camera.id}
                position={{ lat: camera.lat, lng: camera.lng }}
                label={camera.name}
              />
            ))}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
