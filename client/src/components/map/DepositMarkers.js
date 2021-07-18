import { markerClusterGroup } from "leaflet";
import React, { useEffect, useState } from "react";
import { Popup, CircleMarker } from "react-leaflet";

const DepositMarkers = (props) => {
  const { venues, parameter, facing } = props;
  console.log(facing);

  const NewTest = venues?.map((venue) => {
    let obj = { color: "red" };
    if (venue.depositAmount >= 200000) {
      obj.color = "blue";
    } else if (venue.depositAmount >= 100000 && venue.roomRent < 200000) {
      obj.color = "red";
    } else if (venue.roomRent < 100000 && venue.roomRent >= 50000) {
      obj.color = "purple";
    } else if (venue.roomRent < 50000 && venue.roomRent >= 10000) {
      obj.color = "green";
    }
    return { ...venue, ...obj };
  });

  const markers = NewTest?.map((venue, i) => (
    <CircleMarker
      key={i}
      center={[venue.currentLocation[0].lat, venue.currentLocation[0].lng]}
      color={venue.color}
      fillColor={venue.color}
      fillOpacity={0.6}
      radius={20}
      className="circle"
    >
      <Popup>
        <div>
          <h5>Room Rent :{venue.roomRent}</h5>
        </div>
        <div>
          <h5>Deposit Amount :{venue.depositAmount}</h5>
        </div>
        <div>
          <h5>Room Configuration: {venue.roomConfig}</h5>
        </div>
        <div>
          <h5>Floor: {venue.floor}</h5>
        </div>
        <div>
          <h5>Owner Name: {venue.Name}</h5>
        </div>
        <div>
          <h5>Contact No: {venue.contactNo}</h5>
        </div>
      </Popup>
    </CircleMarker>
  ));

  return <>{markers}</>;
};
export default DepositMarkers;
