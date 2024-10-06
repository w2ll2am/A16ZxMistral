import React, { useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Camera } from "lucide-react";

interface CameraLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

const cameraLocations: CameraLocation[] = [
  { id: 1, name: "Blackfriars Bridge", lat: 51.5106, lng: -0.1031 },
  { id: 2, name: "St. Paul's Cathedral", lat: 51.5138, lng: -0.0984 },
  { id: 3, name: "Temple", lat: 51.5114, lng: -0.1134 },
  { id: 4, name: "Sky Garden", lat: 51.5113, lng: -0.0839 },
  { id: 5, name: "Southwark Bridge", lat: 51.5079, lng: -0.0935 },
  { id: 6, name: "Fleet Street", lat: 51.5143, lng: -0.109 },
];

const apiKey = "AIzaSyA4MYHwX8TphBBJx5Ed00DM2DB-f3MA8qM" || "";

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      if (mapRef.current && !mapInstanceRef.current) {
        const { Map } = (await google.maps.importLibrary(
          "maps"
        )) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          "marker"
        )) as google.maps.MarkerLibrary;

        mapInstanceRef.current = new Map(mapRef.current, {
          center: { lat: 51.5126, lng: -0.0981 },
          zoom: 15,
          mapId: "DEMO_MAP_ID",
        });

        cameraLocations.forEach((camera) => {
          const markerView = new AdvancedMarkerElement({
            map: mapInstanceRef.current,
            position: { lat: camera.lat, lng: camera.lng },
            content: createMarkerContent(camera),
          });

          markerView.addListener("click", () => {
            console.log(`Camera ID: ${camera.id}`);
          });
        });
      }
    };

    initMap();
  }, []);

  return <div ref={mapRef} style={{ height: "450px", width: "100%" }} />;
};

const createMarkerContent = (camera: CameraLocation) => {
  const markerElement = document.createElement("div");
  markerElement.className = "marker-content";
  markerElement.innerHTML = `
    <div style="background-color: white; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,.3); padding: 8px; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4A90E2" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
        <circle cx="12" cy="13" r="4"></circle>
      </svg>
      <span style="font-weight: bold; color: #333; font-size: 14px;">Camera ${camera.id}</span>
      <span style="color: #666; font-size: 12px;">${camera.name}</span>
    </div>
  `;
  return markerElement;
};

const InteractiveMap: React.FC = () => {
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="h-full">
          <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white  pb-0">
            <h5 className="pt-2 mb-6 font-bold text-gray-700">
              Interactive Camera Map
            </h5>
          </div>
          <Wrapper apiKey={apiKey} libraries={["marker"]}>
            <div className="bg-white rounded-lg shadow-lg">
              <MapComponent />
            </div>
          </Wrapper>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
