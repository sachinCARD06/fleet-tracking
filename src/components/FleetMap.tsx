import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Vehicle } from "../types/models";

// fix default icon paths for leaflet (vite + bundlers)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export const FleetMap: React.FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
  const center = vehicles.length
    ? [
        vehicles[0].currentLocation?.lat ?? 40.7128,
        vehicles[0].currentLocation?.lng ?? -74.006,
      ]
    : [40.7128, -74.006];

  return (
    <div className="h-[60vh] w-full rounded-md overflow-hidden border">
      <MapContainer
        center={center as [number, number]}
        zoom={13}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {vehicles.map((v) =>
          v.currentLocation ? (
            <Marker
              key={v.id}
              position={[v.currentLocation.lat, v.currentLocation.lng]}
            >
              <Popup>
                <div>
                  <strong>{v.registration}</strong>
                  <div>Type: {v.type}</div>
                  <div>Status: {v.status}</div>
                </div>
              </Popup>
            </Marker>
          ) : null,
        )}
      </MapContainer>
    </div>
  );
};

export default FleetMap;
