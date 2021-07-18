import React from "react";
import loader from "./805.gif";

export const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-item-center"
      // style={{ height: "80px", width: "80px" }}
    >
      <img src={loader} alt="loader"></img>
    </div>
  );
};
