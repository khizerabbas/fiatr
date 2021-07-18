import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-light fixed-top ">
        <div className="container">
          <a href="index.html" className="navbar-brand text-white">
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
    </div>
  );
};
