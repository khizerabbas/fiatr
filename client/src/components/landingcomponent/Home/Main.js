import React, { useState } from "react";
import MapHexa from "../../map/Map";
// import { useIntl } from 'react-intl';
import "./Main.css";
import logo from "../img/logo.png";

const Main = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
}) => {
  return (
    <main className="main">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div>
          <img src={logo} style={{ height: "40px", width: "40px" }}></img>
        </div>

        <div className="container-fluid">
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link  active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/sign-in">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/sign-up">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <MapHexa />
      </div>
    </main>
  );
};

export default Main;
