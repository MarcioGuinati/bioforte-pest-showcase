import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Store, Award } from "lucide-react";

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
    color: "bg-primary text-primary-foreground",
    badgeColor: "bg-primary/20 text-primary border-primary/30",
  },
  franchise: {
    label: "Franquia",
    icon: Store,
    color: "bg-accent text-accent-foreground",
    badgeColor: "bg-accent/20 text-accent-foreground border-accent/30",
  },
  licensed: {
    label: "Licenciado",
    icon: Award,
    color: "bg-secondary text-secondary-foreground",
    badgeColor: "bg-secondary text-secondary-foreground border-secondary",
  },
};

const UnitsMap = () => {
  // Create Google Maps embed URL with all markers
  const centerLat = -22.0;
  const centerLng = -48.5;
  
  // Create markers string for Google Maps
  const markersQuery = units
    .map((unit) => `markers=color:green%7C${unit.coordinates.lat},${unit.coordinates.lng}`)
    .join("&");

  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${centerLat},${centerLng}&zoom=6&maptype=roadmap`;

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
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000000!2d-48.5!3d-22.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDAwJzAwLjAiUyA0OMKwMzAnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de Unidades Bioforte"
                />
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
                      <div className={`p-1.5 rounded ${config.color}`}>
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
                      <div className={`p-2 rounded-lg ${config.color} group-hover:scale-110 transition-transform`}>
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
