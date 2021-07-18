import React from "react";

export const Deposit = () => {
  return (
    <div>
      <h3>Ranges</h3>
      <div className="d-flex flex-row justify-content-start mb-2">
        <span className="dot2 "></span>
        <strong>200k +</strong>
      </div>
      <div className="d-flex flex-row justify-content-start mb-2">
        <span className="dot3 "></span>
        <strong>100k-200k</strong>
      </div>
      <div className="d-flex flex-row justify-content-start mb-2">
        <span className="dot4 "></span>
        <strong>50k-100k</strong>
      </div>
      <div className="d-flex flex-row justify-content-start mb-2">
        <span className="dot6 "></span>
        <strong>10k-50k</strong>
      </div>
    </div>
  );
};
