// src/types/global.d.ts
export {};

declare module "@goongmaps/goong-js" {
  const content: GoongJS;
  export default content;
}

declare global {
  interface Window {
    goongjs: GoongJS;
  }
}

interface GoongJS {
  accessToken: string;
  Map: new (options: GoongMapOptions) => GoongMapInstance;
  Marker: new () => GoongMarkerInstance;
  Popup: new () => GoongPopupInstance;
}

interface GoongMapOptions {
  container: HTMLElement;
  style: string;
  center: [number, number];
  zoom: number;
}

interface GoongMapInstance {
  on: (event: string, callback: () => void) => void;
  remove: () => void;
}

interface GoongMarkerInstance {
  setLngLat: (lngLat: [number, number]) => GoongMarkerInstance;
  setPopup: (popup: GoongPopupInstance) => GoongMarkerInstance;
  addTo: (map: GoongMapInstance) => void;
  remove: () => void;
}

interface GoongPopupInstance {
  setText: (text: string) => GoongPopupInstance;
}