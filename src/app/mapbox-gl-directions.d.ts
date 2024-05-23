declare module '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions' {
    import { Map } from 'mapbox-gl';
  
    interface MapboxDirectionsOptions {
      accessToken: string;
      unit?: 'metric' | 'imperial';
      profile?: 'mapbox/driving' | 'mapbox/walking' | 'mapbox/cycling';
      controls?: {
        inputs?: boolean;
        instructions?: boolean;
        profileSwitcher?: boolean;
      };
    }
  
    class MapboxDirections {
      constructor(options: MapboxDirectionsOptions);
      setOrigin(origin: [number, number] | string): void;
      setDestination(destination: [number, number] | string): void;
      addTo(map: Map): void;
    }
  
    export = MapboxDirections;
  }