import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Store, Award } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";

interface Unit {
  city: string;
  state: string;
  type: "own" | "franchise" | "licensed";
  coordinates: { lat: number; lng: number };
}

const units: Unit[] = [
  { city: "Ribeirão Preto", state: "SP", type: "own", coordinates: { lat: -21.1775, lng: -47.8103 } },
  { city: "Franca", state: "SP", type: "own", coordinates: { lat: -20.5385, lng: -47.4008 } },
  { city: "Uberaba", state: "MG", type: "franchise", coordinates: { lat: -19.7472, lng: -47.9318 } },
  { city: "Araraquara", state: "SP", type: "licensed", coordinates: { lat: -21.7845, lng: -48.1756 } },
  { city: "Guarapuava", state: "PR", type: "licensed", coordinates: { lat: -25.3935, lng: -51.4562 } },
];

const typeConfig = {
  own: {
    label: "Unidade Própria",
    icon: Building,
    color: "#2d7a4a",
    bgColor: "bg-primary text-primary-foreground",
    badgeColor: "bg-primary/20 text-primary border-primary/30",
  },
  franchise: {
    label: "Franquia",
    icon: Store,
    color: "#6b9a1e",
    bgColor: "bg-accent text-accent-foreground",
    badgeColor: "bg-accent/20 text-accent-foreground border-accent/30",
  },
  licensed: {
    label: "Licenciado",
    icon: Award,
    color: "#64748b",
    bgColor: "bg-secondary text-secondary-foreground",
    badgeColor: "bg-secondary text-secondary-foreground border-secondary",
  },
};

// Custom marker icon creator
const createCustomIcon = (color: string) => {
  return new DivIcon({
    className: "custom-marker",
    html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

const UnitsMap = () => {
  // Center of the map (approximately center of all units)
  const centerLat = -22.0;
  const centerLng = -49.0;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 animate-bounce-slow">
            Nossas Unidades
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Estamos <span className="text-gradient">perto de você</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça nossas unidades próprias, franquias e licenciados espalhados pelo Brasil.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="glass overflow-hidden h-[500px]">
              <CardContent className="p-0 h-full">
                <MapContainer
                  center={[centerLat, centerLng]}
                  zoom={6}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {units.map((unit, index) => {
                    const config = typeConfig[unit.type];
                    return (
                      <Marker
                        key={index}
                        position={[unit.coordinates.lat, unit.coordinates.lng]}
                        icon={createCustomIcon(config.color)}
                      >
                        <Popup>
                          <div className="text-center p-1">
                            <strong className="text-base">{unit.city} - {unit.state}</strong>
                            <br />
                            <span className="text-sm text-gray-600">{config.label}</span>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </CardContent>
            </Card>
          </div>

          {/* Units List */}
          <div className="space-y-4">
            {/* Legend */}
            <Card className="glass">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Legenda</h3>
                <div className="space-y-2">
                  {Object.entries(typeConfig).map(([key, config]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${config.bgColor}`}>
                        <config.icon className="h-3 w-3" />
                      </div>
                      <span className="text-sm">{config.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Units Cards */}
            {units.map((unit, index) => {
              const config = typeConfig[unit.type];
              return (
                <Card key={index} className="glass hover-lift group">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${config.bgColor} group-hover:scale-110 transition-transform`}>
                        <config.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold">{unit.city}</h4>
                          <Badge variant="outline" className={config.badgeColor}>
                            {unit.state}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {config.label}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnitsMap;
