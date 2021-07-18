import React, { useEffect, useState } from "react";
import { Popup, CircleMarker } from "react-leaflet";
import "./style.css";
const FlatMarkers = (props) => {
  const { venues, parameter, facing } = props;
  console.log(facing);

  if (venues) {
    var NewTest = venues?.map((venue) => {
      let obj = { color: "red" };
      if (venue.roomRent >= 20000) {
        obj.color = "blue";
      } else if (venue.roomRent >= 10000 && venue.roomRent < 20000) {
        obj.color = "red";
      } else if (venue.roomRent < 10000 && venue.roomRent >= 5000) {
        obj.color = "purple";
      } else if (venue.roomRent < 5000 && venue.roomRent >= 1000) {
        obj.color = "green";
      }
      return { ...venue, ...obj };
    });
  }
  // if (facing) {
  //   console.log(`facingfilter${facing}`);
  //   console.log(NewTest);
  //   NewTest = NewTest.filter((data) => {
  //     return data.facing === facing;
  //   });
  // }

  var markers = NewTest?.map((venue, i) => (
    <CircleMarker
      key={i}
      center={[venue.currentLocation[0].lat, venue.currentLocation[0].lng]}
      color={venue.color}
      radius={20}
    >
      <Popup maxHeight={800} minWidth={100}>
        <div className=" d-flex flex-row">
          <div className="col ">
            <h6>Room Rent :{venue.roomRent}</h6>

            <h6>Deposit Amount :{venue.depositAmount}</h6>

            <h6>Room Configuration: {venue.roomConfig}</h6>

            <h6>Floor: {venue.floor}</h6>
          </div>
          <div className="col ">
            <img
              style={{ height: "150px", width: "150px" }}
              src={venue.image}
            ></img>
            <button className="btn btn-primary m-3">More Info</button>
          </div>
        </div>
      </Popup>
    </CircleMarker>
  ));
  return <>{markers}</>;
};
export default FlatMarkers;
