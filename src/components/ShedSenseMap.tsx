import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ShedSenseMapProps {
  className?: string;
}

const ShedSenseMap = ({ className }: ShedSenseMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const loadMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [28.5833, -20.1500], // Zimbabwe center
      zoom: 6,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Sample outage markers
    const outageLocations = [
      { name: 'Harare CBD', coords: [31.0492, -17.8252], status: 'active' },
      { name: 'Bulawayo', coords: [28.5833, -20.1500], status: 'scheduled' },
      { name: 'Mutare', coords: [32.6704, -18.9707], status: 'active' },
      { name: 'Gweru', coords: [29.8149, -19.4500], status: 'clear' },
    ];

    map.current.on('load', () => {
      outageLocations.forEach((location) => {
        const el = document.createElement('div');
        el.className = 'outage-marker';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
        
        if (location.status === 'active') {
          el.style.backgroundColor = 'hsl(var(--energy))';
          el.style.animation = 'pulse 2s infinite';
        } else if (location.status === 'scheduled') {
          el.style.backgroundColor = 'hsl(var(--destructive))';
        } else {
          el.style.backgroundColor = 'hsl(var(--tech))';
        }

        new mapboxgl.Marker(el)
          .setLngLat(location.coords as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div style="padding: 8px; font-family: system-ui;">
                  <strong>${location.name}</strong><br/>
                  Status: ${location.status}
                </div>
              `)
          )
          .addTo(map.current!);
      });
    });

    setIsMapLoaded(true);
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isMapLoaded) {
    return (
      <div className={className}>
        <div className="glass rounded-2xl p-8 space-y-6">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="font-medium">Mapbox Token Required</p>
              <p className="text-muted-foreground">
                To view the interactive map, please enter your Mapbox public token.
                Get one free at{' '}
                <a
                  href="https://mapbox.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
              <Input
                id="mapbox-token"
                type="text"
                placeholder="pk.eyJ1..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
              />
            </div>
            <Button
              onClick={() => loadMap(mapboxToken)}
              variant="hero"
              className="w-full"
              disabled={!mapboxToken}
            >
              Load Interactive Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={mapContainer} className="w-full h-full rounded-2xl shadow-premium" />
    </div>
  );
};

export default ShedSenseMap;
