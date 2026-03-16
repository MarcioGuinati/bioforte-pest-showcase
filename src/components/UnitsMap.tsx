import { lazy, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Store, Award } from "lucide-react";

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
  { city: "Barretos", state: "SP", type: "franchise", coordinates: { lat: -20.5567, lng: -48.5677 } },
  { city: "Araraquara", state: "SP", type: "licensed", coordinates: { lat: -21.7845, lng: -48.1756 } },
  { city: "Guarapuava", state: "PR", type: "licensed", coordinates: { lat: -25.3935, lng: -51.4562 } },
];

const typeConfig = {
  own: {
    label: "Unidade Própria",
    icon: Building,
    bgColor: "bg-primary text-primary-foreground",
    badgeColor: "bg-primary/20 text-primary border-primary/30",
  },
  franchise: {
    label: "Franquia",
    icon: Store,
    bgColor: "bg-accent text-accent-foreground",
    badgeColor: "bg-accent/20 text-accent-foreground border-accent/30",
  },
  licensed: {
    label: "Licenciado",
    icon: Award,
    bgColor: "bg-secondary text-secondary-foreground",
    badgeColor: "bg-secondary text-secondary-foreground border-secondary",
  },
};

// Lazy load the map component with intersection observer
const LazyMap = lazy(() => import("./LazyMapContent"));

const MapSkeleton = () => (
  <div 
    className="h-[500px] bg-muted rounded-lg flex items-center justify-center" 
    role="status" 
    aria-label="Carregando mapa"
  >
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
      <p className="text-muted-foreground text-sm">Carregando mapa...</p>
    </div>
  </div>
);

const UnitsMap = () => {
  return (
    <section className="py-20 bg-muted/30" aria-labelledby="units-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Nossas Unidades
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" id="units-heading">
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
                <Suspense fallback={<MapSkeleton />}>
                  <LazyMap units={units} typeConfig={typeConfig} />
                </Suspense>
              </CardContent>
            </Card>
          </div>

          {/* Units List */}
          <div className="space-y-4">
            {/* Legend */}
            <Card className="glass">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">Legenda</h3>
                <ul className="space-y-2" role="list">
                  {Object.entries(typeConfig).map(([key, config]) => (
                    <li key={key} className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${config.bgColor}`} aria-hidden="true">
                        <config.icon className="h-3 w-3" />
                      </div>
                      <span className="text-sm">{config.label}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Units Cards */}
            <ul className="space-y-4" role="list" aria-label="Lista de unidades">
              {units.map((unit, index) => {
                const config = typeConfig[unit.type];
                return (
                  <li key={index}>
                    <Card className="glass hover-lift group">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${config.bgColor} group-hover:scale-110 transition-transform`} aria-hidden="true">
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
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnitsMap;
