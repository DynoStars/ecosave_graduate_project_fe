export {};

declare module "@goongmaps/goong-js" {
  const goongjs: GoongJS;
  export default goongjs;
}

declare global {
  interface Window {
    goongjs: GoongJS;
  }
}

/** Main GoongJS Interface */
interface GoongJS {
  accessToken: string;
  Map: new (options: GoongMapOptions) => GoongMapInstance;
  Marker: new (options?: GoongMarkerOptions) => GoongMarkerInstance;
  Popup: new (options?: GoongPopupOptions) => GoongPopupInstance;
  NavigationControl: new () => GoongNavigationControl;
  GeolocateControl: new (options?: GoongGeolocateControlOptions) => GoongGeolocateControl;
  Layer: new (options: GoongLayerOptions) => GoongLayer;
  Source: new (options: GoongSourceOptions) => GoongSource;
}

/** Map Options */
interface GoongMapOptions {
  container: HTMLElement | string;
  style: string;
  center: [number, number];
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  pitch?: number;
  bearing?: number;
}

/** Marker Options */
interface GoongMarkerOptions {
  element?: HTMLElement;
  anchor?: "center" | "top" | "bottom" | "left" | "right" |
           "top-left" | "top-right" | "bottom-left" | "bottom-right";
  draggable?: boolean;
  color?: string;
  scale?: number;
}

/** Popup Options */
interface GoongPopupOptions {
  offset?: number;
  closeOnClick?: boolean;
  closeButton?: boolean;
  maxWidth?: string;
}

/** Geolocate Control Options */
interface GoongGeolocateControlOptions {
  positionOptions?: PositionOptions;
  trackUserLocation?: boolean;
  showAccuracyCircle?: boolean;
}

/** Map Instance */
interface GoongMapInstance {
  on: (event: string, callback: (event?: any) => void) => void;
  off: (event: string, callback: (event?: any) => void) => void;
  remove: () => void;
  addControl: (control: GoongNavigationControl | GoongGeolocateControl,
               position?: "top-left" | "top-right" | "bottom-left" | "bottom-right") => void;
  addLayer: (layer: GoongLayer) => void;
  addSource: (id: string, source: GoongSourceOptions) => void;
  getSource: (id: string) => GoongSource | undefined;

  /** Added for radar-scan effect */
  setPaintProperty: (layer: string, property: string, value: any) => void;
}

/** Marker Instance */
interface GoongMarkerInstance {
  setLngLat: (lngLat: [number, number]) => GoongMarkerInstance;
  setPopup: (popup: GoongPopupInstance) => GoongMarkerInstance;
  addTo: (map: GoongMapInstance) => GoongMarkerInstance;
  remove: () => void;
  setDraggable: (draggable: boolean) => GoongMarkerInstance;
  getLngLat: () => [number, number];
  getElement: () => HTMLElement;
  getPopup: () => GoongPopupInstance;

  /** Added to toggle popup */
  togglePopup: () => void;
}

/** Popup Instance */
interface GoongPopupInstance {
  setText: (text: string) => GoongPopupInstance;
  setHTML: (html: string) => GoongPopupInstance;
  setMaxWidth: (maxWidth: string) => GoongPopupInstance;
  addTo: (map: GoongMapInstance) => GoongPopupInstance;
  remove: () => void;
}

/** Navigation Control */
interface GoongNavigationControl {
  addTo: (map: GoongMapInstance) => void;
  remove: () => void;
}

/** Geolocate Control */
interface GoongGeolocateControl {
  addTo: (map: GoongMapInstance) => void;
  remove: () => void;
}

/** Layer Options */
interface GoongLayerOptions {
  id: string;
  type: "fill" | "line" | "symbol" | "circle" | "heatmap" | "fill-extrusion" | "raster" | "hillshade";
  source: string | GoongSourceOptions;
  paint?: Record<string, any>;
  layout?: Record<string, any>;
}

/** Source Options */
interface GoongSourceOptions {
  type: "geojson" | "vector" | "raster" | "image" | "video";
  data?: any;
  url?: string;
  coordinates?: [number, number][];
}
