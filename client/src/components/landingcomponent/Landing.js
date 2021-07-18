import React from "react";
import { Link } from "react-router-dom";
import MapHexa from "../map/Map";
import "./Landing.css";
import logo from "./img/logo.png";
export const Landing = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top navbarLanding ">
        <div className="container">
          <a href="index.html" className="navbar-brand">
            <img
              src={logo}
              style={{ height: "40px", width: "40px" }}
              alt="logo"
            ></img>
            FLATR
          </a>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto ">
              <li className="nav-item">
                <Link to="/sign-in" className="nav-link">
                  Sign-in
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sign-up" className="nav-link">
                  Sign-up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="main2">
        <MapHexa />
      </div>
    </div>
  );
};
