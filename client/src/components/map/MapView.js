import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Markers from "./FlatMarkers";
import { connect } from "react-redux";
import "leaflet/dist/leaflet.css";
import { getMapData } from "../../action/getMapData";
import "react-leaflet-markercluster/dist/styles.min.css";
import { Loader } from "../Loader/Loader";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { FlatIcon } from "./Icon";
import DepositMarkers from "./DepositMarkers";
import { ReactDOM } from "react";
import { RoomRent } from "./parameter/RoomRent";
import { Deposit } from "./parameter/Deposit";

function MapView({
  getMapData,
  loading,
  mapdata,
  parameter,
  current_parameter,
  current_facing,
}) {
  useEffect(() => {
    getMapData();
  }, []);

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
      const legend = L.control({ position: "bottomleft" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "legend");
        div.innerHTML = ``;
        return div;
      };

      // L.control.zoom({
      //   position: 'bottomright'
      // }).addTo(map);

      legend.addTo(map);

      map.addControl(searchControl);
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
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {(() => {
        switch (current_parameter) {
          case "Rent":
            return (
              <MarkerClusterGroup>
                <Markers
                  venues={mapdata}
                  parameter={current_parameter}
                  facing={current_facing}
                />
              </MarkerClusterGroup>
            );

          case "deposit":
            return <DepositMarkers venues={mapdata} />;

          default:
            return (
              <MarkerClusterGroup>
                <Markers
                  venues={mapdata}
                  parameter={current_parameter}
                  facing={current_facing}
                />
              </MarkerClusterGroup>
            );
        }
      })()}
      <LeafletgeoSearch />
    </MapContainer>
  );
}

const mapStateToProps = (state) => ({
  mapdata: state.Map.mapData,
  loading: state.Map.loading,
  current_parameter: state.Map.current_parameter,
  current_facing: state.Map.current_facing,
});




let firstAccordionStatus = true;
let secondAccordionStatus = true;
let thirdAccordionStatus = true;
let thirdOneAccordionStatus = true;
let thirdTwoAccordionStatus = true;
function firstAccordion(){
  if(firstAccordionStatus){
    firstAccordionStatus = false;
    document.getElementById('first-right-arrow').classList.add('d-none');
    document.getElementById('collapseOne').style.display = 'block';
    document.getElementById('first-down-arrow').classList.remove('d-none');
  }else{
    firstAccordionStatus = true;
    document.getElementById('first-right-arrow').classList.remove('d-none');
    document.getElementById('collapseOne').style.display = 'none';
    document.getElementById('first-down-arrow').classList.add('d-none');
  }
}

function secondAccordion(){
  if(secondAccordionStatus){
    secondAccordionStatus = false;
    document.getElementById('second-right-arrow').classList.add('d-none');
    document.getElementById('collapseTwo').style.display = 'block';
    document.getElementById('second-down-arrow').classList.remove('d-none');
  }else{
    secondAccordionStatus = true;
    document.getElementById('second-right-arrow').classList.remove('d-none');
    document.getElementById('collapseTwo').style.display = 'none';
    document.getElementById('second-down-arrow').classList.add('d-none');
  }
}
function thirdAccordion(){
  if(thirdAccordionStatus){
    thirdAccordionStatus = false;
    document.getElementById('third-right-arrow').classList.add('d-none');
    document.getElementById('collapseThree').style.display = 'block';
    document.getElementById('third-down-arrow').classList.remove('d-none');
  }else{
    thirdAccordionStatus = true;
    document.getElementById('third-right-arrow').classList.remove('d-none');
    document.getElementById('collapseThree').style.display = 'none';
    document.getElementById('third-down-arrow').classList.add('d-none');
  }
}
function thirdOneAccordion(){
  if(thirdOneAccordionStatus){
    thirdOneAccordionStatus = false;
    document.getElementById('third-one-right-arrow').classList.add('d-none');
    document.getElementById('collapseThreeOne').style.display = 'block';
    document.getElementById('third-one-down-arrow').classList.remove('d-none');
  }else{
    thirdOneAccordionStatus = true;
    document.getElementById('third-one-right-arrow').classList.remove('d-none');
    document.getElementById('collapseThreeOne').style.display = 'none';
    document.getElementById('third-one-down-arrow').classList.add('d-none');
  }
}
function thirdTwoAccordion(){
  if(thirdTwoAccordionStatus){
    thirdTwoAccordionStatus = false;
    document.getElementById('third-two-right-arrow').classList.add('d-none');
    document.getElementById('collapseThreeTwo').style.display = 'block';
    document.getElementById('third-two-down-arrow').classList.remove('d-none');
  }else{
    thirdTwoAccordionStatus = true;
    document.getElementById('third-two-right-arrow').classList.remove('d-none');
    document.getElementById('collapseThreeTwo').style.display = 'none';
    document.getElementById('third-two-down-arrow').classList.add('d-none');
  }
}
export default connect(mapStateToProps, { getMapData })(MapView);
