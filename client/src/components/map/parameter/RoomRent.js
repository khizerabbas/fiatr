import React from "react";

export const RoomRent = () => {
  return (
    <div>
      <h3>Ranges</h3>
      <div className="d-flex flex-row justify-content-start mb-2">
        <span className="dot2 "></span>
        <strong>20k +</strong>
      </div>
      <div className="d-flex flex-row justify-content-start mb-2">
        <span className="dot3 "></span>
        <strong>10k-20k</strong>
      </div>
      <div className="d-flex flex-row justify-content-start mb-2">
        <span className="dot4 "></span>
        <strong>5k-10k</strong>
      </div>
      <div className="d-flex flex-row justify-content-start mb-2">
        <span className="dot6 "></span>
        <strong>1k-5k</strong>
      </div>
    </div>
  );
};
