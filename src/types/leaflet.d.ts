// Minimal ambient typing to satisfy TS when Leaflet's own types aren't picked up.
// The app uses `leaflet` + `react-leaflet` mostly at runtime; these declarations are
// just to prevent TS build failures.

export as namespace L;

declare const L: any;

declare module "leaflet" {
  const leaflet: any;
  export default leaflet;
  export = leaflet;
}


