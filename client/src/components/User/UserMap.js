import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { Loader } from "../Loader/Loader";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { FlatIcon } from "../map/Icon";

function UserMap({ loading }) {
  function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        autoComplete: true,
        marker: {
          FlatIcon,
        },
      });
      map.addControl(searchControl);
      map.on("click", function (e) {
        alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
      });
      return () => map.removeControl(searchControl);
    }, []);
    return null;
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <MapContainer
      style={{ height: "500px" }}
      center={[12.9141, 74.856]}
      zoom={6}
      maxZoom={18}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LeafletgeoSearch />
    </MapContainer>
  );
}
export default UserMap;
