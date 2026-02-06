import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";

interface Unit {
  city: string;
  state: string;
  type: "own" | "franchise" | "licensed";
  coordinates: { lat: number; lng: number };
}

interface TypeConfig {
  [key: string]: {
    label: string;
    bgColor: string;
    badgeColor: string;
  };
}

interface LazyMapContentProps {
  units: Unit[];
  typeConfig: TypeConfig;
}

const colorMap: Record<string, string> = {
  own: "#2d7a4a",
  franchise: "#6b9a1e",
  licensed: "#64748b",
};

const createCustomIcon = (type: string) => {
  const color = colorMap[type] || "#64748b";
  return new DivIcon({
    className: "custom-marker",
    html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

const LazyMapContent = ({ units, typeConfig }: LazyMapContentProps) => {
  const centerLat = -22.0;
  const centerLng = -49.0;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {units.map((unit, index) => {
        const config = typeConfig[unit.type];
        return (
          <Marker
            key={index}
            position={[unit.coordinates.lat, unit.coordinates.lng]}
            icon={createCustomIcon(unit.type)}
          >
            <Popup>
              <div className="text-center p-1">
                <strong className="text-base">{unit.city} - {unit.state}</strong>
                <br />
                <span className="text-sm text-muted-foreground">{config.label}</span>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default LazyMapContent;
