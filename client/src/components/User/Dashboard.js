import React, { useEffect } from "react";
import { connect } from "react-redux";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { UserMarkers } from "./UserMarkers";
import { Loader } from "../Loader/Loader";
import { MapContainer, TileLayer } from "react-leaflet";
import { getmydata } from "../../action/getMapData";
import Layout from "./Layout/Layout";
import "./css/Main.css";
const UserDashboard = ({ mydata, loadinguser, getmydata, match }) => {
  useEffect(() => {
    getmydata();
  }, [loadinguser]);
  if (loadinguser) {
    return <Loader />;
  }

  return (
    <div className="wrapper">
      <Layout />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Dashboard</h4>
            <div className="row">
              <div className="col-md-5">
                <div className="card card-stats card-warning bg-warning">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-users"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Users</p>
                          <h4 className="card-title">1,294</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-stats card-success bg-success">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-bar-chart"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Added Flats</p>
                          <h4 className="card-title">1,345</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Your Flats</h4>
                    <p className="card-category">
                      check how many flats you have added
                    </p>
                  </div>
                  <div className="card-body">
                    <div className="mapcontainer">
                      <div className="map">
                        <MapContainer
                          style={{ height: "300px" }}
                          center={[12.9141, 74.856]}
                          zoom={0}
                          maxZoom={18}
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                          />
                          <MarkerClusterGroup>
                            <UserMarkers mapdata={mydata} />
                          </MarkerClusterGroup>
                        </MapContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  mydata: state.Map.mydata,
  loadinguser: state.Map.loadinguser,
});
export default connect(mapStateToProps, { getmydata })(UserDashboard);
