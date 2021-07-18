import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { addMapData } from "../../action/addMapData";
import { connect } from "react-redux";
import Alert from "../alert/alert";
import { setAlert } from "../../action/alert";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { FlatIcon } from "../map/Icon";
import Layout from "./Layout/Layout";
import { useParams, useHistory } from "react-router-dom";
import "./css/Main.css";

const Addvalue = ({ history, setAlert }) => {
  const { id } = useParams();
  console.log(id);
  const [formData, SetFormData] = useState({
    roomRent: "",
    depositAmount: "",
    roomConfig: "",
    floor: "",
    facing: "",
    contactNo: "",
    Name: "",
    lat: "",
    lng: "",
  });
  const {
    roomRent,
    depositAmount,
    roomConfig,
    floor,
    facing,
    contactNo,
    Name,
  } = formData;
  const onChange = (e) =>
    SetFormData({ ...formData, [e.target.name]: e.target.value });

  const editLatitude = (e) => {
    SetFormData({ ...formData, lat: e.target.value });
  };
  const editLongitude = (e) => {
    SetFormData({ ...formData, lng: e.target.value });
  };
  const editSubmit = (e) => {
    e.preventDefault();
    SetFormData({
      ...formData,
      lat: formData.lat,
      lng: formData.lng,
    });
    setAlert("values updated", "success");
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const currentLocation = {
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        };

        SetFormData({
          ...formData,
          lat: currentLocation.lat,
          lng: currentLocation.lng,
        });
      },
      function errorCallback(error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        autoComplete: true,
        marker: {
          FlatIcon,
        },
      });
      map.addControl(searchControl);
      map.on("click", function (e) {
        swal({
          title: "You choosed " + e.latlng,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((onConfirm) => {
          if (onConfirm) {
            SetFormData({
              ...formData,
              lat: e.latlng.lat,
              lng: e.latlng.lng,
            });
            swal("updated", {
              icon: "success",
            });
          } else {
            swal("Not updated!");
          }
        });
      });

      return () => map.removeControl(searchControl);
    }, []);
    return null;
  }
  return (
    <div class="wrapper">
      <Layout />
      <div class="main-panel">
        <div class="content">
          <div class="container-fluid">
            <h4 class="page-title">Add value</h4>
            <div className="col col-lg-12 ">
              <div className="row">
                <div className="col col-lg-5">
                  <Alert />
                  <div className="card ">
                    <div className="card-header mb-2 p-1 text-red">
                      Detected GPS location :{formData.lat},{formData.lng}
                      <div>
                        <button
                          className="btn btn-danger"
                          type="button"
                          data-toggle="modal"
                          data-target="#mymodal"
                        >
                          Edit
                        </button>
                        <div id="mymodal" className="modal fade">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                Edit your location
                              </div>
                              <Alert />
                              <div className="modal-body">
                                <form
                                  onSubmit={(e) => {
                                    editSubmit(e);
                                  }}
                                >
                                  <div className="form-group">
                                    <label>Enter Latitude</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      onChange={(e) => {
                                        editLatitude(e);
                                      }}
                                    ></input>
                                  </div>
                                  <div className="form-group">
                                    <label>Enter Longitude</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder=""
                                      onChange={(e) => {
                                        editLongitude(e);
                                      }}
                                    ></input>
                                  </div>
                                  <div className="modal-footer">
                                    <input
                                      type="submit"
                                      className="btn btn-success"
                                    ></input>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <form>
                      <div className="form-group row">
                        <label
                          for="inputEmail3"
                          className="col-md-4 col-form-label bg-lightblue mb-2"
                        >
                          Room rent
                        </label>
                        <div className="col-sm-8 mb-2 ">
                          <input
                            className="form-control"
                            name="roomRent"
                            value={roomRent}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="inputPassword3"
                          className="col-md-4 col-form-label bg-lightblue mb-2"
                        >
                          Deposit amount
                        </label>
                        <div className="col-sm-8 mb-2">
                          <input
                            className="form-control"
                            name="depositAmount"
                            value={depositAmount}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="inputPassword3"
                          className="col-md-4 col-form-label bg-lightblue mb-2"
                        >
                          Room config
                        </label>
                        <div className="col-sm-8 mb-2">
                          <input
                            className="form-control"
                            name="roomConfig"
                            value={roomConfig}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="inputPassword3"
                          className="col-md-4 col-form-label bg-lightblue mb-2"
                        >
                          Floor
                        </label>
                        <div className="col-sm-8 mb-2">
                          <input
                            className="form-control"
                            name="floor"
                            value={floor}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="inputPassword3"
                          className="col-md-4 col-form-label bg-lightblue mb-2"
                        >
                          Facing
                        </label>
                        <div className="col-sm-8 mb-2">
                          <input
                            className="form-control"
                            name="facing"
                            value={facing}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="inputPassword3"
                          className="col-md-4 col-form-label bg-orange mb-2"
                        >
                          Contact No
                        </label>
                        <div className="col-sm-8 mb-2">
                          <input
                            className="form-control"
                            name="contactNo"
                            value={contactNo}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="inputPassword3"
                          className="col-md-4 col-form-label bg-white"
                        >
                          Name
                        </label>
                        <div className="col-sm-8 mb-2">
                          <input
                            className="form-control"
                            name="Name"
                            value={Name}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        </div>
                      </div>
                    </form>
                    <Link
                      to={{
                        pathname: "/addvalue2/",
                        state: { formData, id },
                      }}
                    >
                      <button className="btn btn-success">next page</button>
                    </Link>
                  </div>
                </div>
                <div className="col col-lg-7 ">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Choose LATLNG from Map</h4>

                      <MapContainer
                        style={{ height: "400px" }}
                        center={[12.9141, 74.856]}
                        zoom={0}
                        maxNativeZoom={19}
                        maxZoom={25}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LeafletgeoSearch />
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
  );
};
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { addMapData, setAlert })(
  withRouter(Addvalue)
);
