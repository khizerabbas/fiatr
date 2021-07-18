import React, { Fragment, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapHexa from "./components/map/Map";
import { Landing } from "./components/landingcomponent/Landing";
import Signup from "./components/User/signup";
import UserDashboard from "./components/User/Dashboard";
import Addvalue from "./components/User/Addvalue";
import Addvalue2 from "./components/User/Addvalue2";
import ViewValue from "./components/User/ViewValue";
import loginComponent from "./components/User/login.component";
import MapView from "./components/map/MapView";
import Profile from "./components/User/Profile";
import { loadUser } from "./action/auth";
import { setAuthToken } from "./utils/setAuthToken";
import SuperAdminDashboard from "./components/SuperAdmin/SuperAdminDashboard";
import { Posts } from "./components/SuperAdmin/Posts";
import Users from "./components/SuperAdmin/Users";
import { Settings } from "./components/SuperAdmin/Settings";
import useScript from "./utils/useScript";
import $ from "jquery";
import Flatr from "./components/landingcomponent/flatr";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  useScript("/assets/js/core/jquery.3.2.1.min.js");
  useScript("/assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js");
  useScript("/assets/js/core/bootstrap.min.js");
  useScript("/assets/js/plugin/bootstrap-toggle/bootstrap-toggle.min.js");
  useScript("/assets/js/ready.min.js");
  useScript("/assets/js/demo.js");
  useScript("/assets/js/flatr.js");
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Flatr}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/mapview" component={MapView}></Route>
            {/* <Route exact path="/" component={Landing}></Route> */}
            <Route exact path="/map" component={MapHexa}></Route>
            <Route exact path="/sign-up" component={Signup}></Route>
            <Route exact path="/sign-in" component={loginComponent}></Route>
            <Route
              exact
              path="/userdashboard"
              component={UserDashboard}
            ></Route>
            <Route exact path="/addvalue/:id" component={Addvalue}></Route>
            <Route exact path="/Addvalue2" component={Addvalue2}></Route>
            <Route exact path="/viewvalue/" component={ViewValue}></Route>
            <Route
              exact
              path="/superadmin"
              component={SuperAdminDashboard}
            ></Route>
            <Route exact path="/posts" component={Posts}></Route>
            <Route exact path="/users" component={Users}></Route>
            <Route exact path="/settings" component={Settings}></Route>
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
};
