import L from "leaflet";
import flaticon from "./img/venue_location_icon.svg";

export const FlatIcon = L.icon({
  iconUrl: flaticon,
  iconRetinaUrl: flaticon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});
