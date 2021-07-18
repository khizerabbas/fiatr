import React, { useState, useEffect } from "react";
import { loadUser, logout } from "../../../action/auth";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import dp from "../img/man.png";
import logo from "../img/logo.png";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../../action/type";
import useScript from "../../../utils/useScript";
import "../css/Sidebar.css";

const Layout = () => {
  useScript("./assets/js/core/jquery.3.2.1.min.js");
  useScript("./assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js");
  useScript("./assets/js/core/bootstrap.min.js");
  useScript("./assets/js/plugin/bootstrap-toggle/bootstrap-toggle.min.js");
  useScript("./assets/js/ready.min.js");
  useScript("./assets/js/demo.js");

  const [profile, setprofile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = profile?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setprofile(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  const { user } = profile;

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/auth");
    setprofile(null);
  };

  return (
    <div>
      <div className="main-header">
        <div className="logo-header">
          <a href="/userDashboard" className="logo">
            <img
              src={logo}
              alt="logo"
              style={{ height: "40px", width: "40px" }}
              className="rounded-circle"
            ></img>
            FlATR Dashboard
          </a>
          <button
            className="navbar-toggler sidenav-toggler ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="collapse"
            aria-controls="sidebar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <button className="topbar-toggler more">
            <i className="la la-ellipsis-v"></i>
          </button>
        </div>
        <nav className="navbar navbar-header navbar-expand-lg">
          <div className="container-fluid">
            <form
              className="navbar-left navbar-form nav-search mr-md-3"
              action=""
            >
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search ..."
                  className="form-control"
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="la la-search search-icon"></i>
                  </span>
                </div>
              </div>
            </form>
            <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
              <li className="nav-item dropdown hidden-caret">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="la la-envelope"></i>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown hidden-caret">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="la la-bell"></i>
                  <span className="notification">3</span>
                </a>
                <ul
                  className="dropdown-menu notif-box"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <div className="dropdown-title">
                      You have 4 new notification
                    </div>
                  </li>
                  <li>
                    <div className="notif-center">
                      <a href="#">
                        <div className="notif-icon notif-primary">
                          {" "}
                          <i className="la la-user-plus"></i>{" "}
                        </div>
                        <div className="notif-content">
                          <span className="block">New user registered</span>
                          <span className="time">5 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-icon notif-success">
                          {" "}
                          <i className="la la-comment"></i>{" "}
                        </div>
                        <div className="notif-content">
                          <span className="block">
                            Rahmad commented on Admin
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="assets/img/profile2.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="block">
                            Reza send messages to you
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-icon notif-danger">
                          {" "}
                          <i className="la la-heart"></i>{" "}
                        </div>
                        <div className="notif-content">
                          <span className="block">Farrah liked Admin</span>
                          <span className="time">17 minutes ago</span>
                        </div>
                      </a>
                    </div>
                  </li>
                  <li>
                    <a className="see-all" href="javascript:void(0);">
                      {" "}
                      <strong>See all notifications</strong>{" "}
                      <i className="la la-angle-right"></i>{" "}
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="dropdown-toggle profile-pic"
                  data-toggle="dropdown"
                  href="#"
                  aria-expanded="false"
                >
                  {" "}
                  <img
                    src={user?.avatar ? user.avatar : dp}
                    alt="user-img"
                    width="36"
                    className="img-circle"
                  />
                  <span>{user.firstname}</span>
                </a>
                <ul className="dropdown-menu dropdown-user">
                  <li>
                    <div className="user-box">
                      <div className="u-img">
                        <img src={user.avatar ? user.avatar : dp} />
                      </div>
                      <div className="u-text">
                        <h4></h4>
                        <p className="text-muted">hello@themekita.com</p>
                        <a
                          href="profile.html"
                          className="btn btn-rounded btn-danger btn-sm"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  </li>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    <i className="ti-user"></i> My Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    {" "}
                    My Balance
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="ti-email"></i> Inbox
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    <i className="ti-settings"></i> Account Setting
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    <i className="fa fa-power-off"></i> Logout
                  </a>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="sidebar">
        <div className="scrollbar-inner sidebar-wrapper">
          <div className="user">
            <div className="photo">
              <img src={user?.avatar ? user.avatar : dp} />
            </div>
            <div className="info">
              <a
                className=""
                data-toggle="collapse"
                href="#collapseExample"
                aria-expanded="true"
              >
                <span>
                  {user.firstname}
                  <span className="user-level">USER</span>
                  <span className="caret"></span>
                </span>
              </a>
              <div className="clearfix"></div>

              <div
                className="collapse in"
                id="collapseExample"
                aria-expanded="true"
              >
                <ul className="nav">
                  <li>
                    <Link to="/profile">
                      <span className="link-collapse">My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile">
                      <span className="link-collapse">Edit Profile</span>
                    </Link>
                  </li>
                  <li>
                    <a href="#settings">
                      <span className="link-collapse">Settings</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul className="nav">
            <li className="nav-item active">
              <Link to="/userDashboard/">
                <i className="la la-dashboard"></i>
                <p>Dashboard</p>
                <span className="badge badge-count">5</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/addvalue/${user._id}`}>
                <i className="fa fa-plus p-1 "></i>
                <p className="text-decoration-none">Add value</p>
                <span className="badge badge-count">14</span>
              </Link>
            </li>
            <li className="nav-item ">
              <Link to={"/viewvalue/"}>
                <i className="la la-table"></i>
                <p>View value</p>
                <span className="badge badge-count">50</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" onClick={logout}>
                <i className="fa fa-sign-out  "></i>
                <p>Logout</p>
                <span className="badge badge-count">6</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { logout, logout })(Layout);
