import React from "react";
import { Popup, CircleMarker } from "react-leaflet";
export const UserMarkers = ({ mapdata }) => {
  var markers = mapdata?.map((venue, i) => (
    <CircleMarker
      key={i}
      center={[venue.currentLocation[0].lat, venue.currentLocation[0].lng]}
      color={venue.color}
      radius={20}
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
