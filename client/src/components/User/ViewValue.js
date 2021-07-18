import React, { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { connect } from "react-redux";
import { getmydata, updateStatus } from "../../action/getMapData";
import { deltemydata } from "../../action/getMapData";
import Layout from "./Layout/Layout";
const ViewValue = ({
  getmydata,
  profiles,
  loadinguser,
  deltemydata,
  updateStatus,
}) => {
  useEffect(() => {
    getmydata();
  }, []);

  if (loadinguser) {
    return <Loader />;
  }

  const activate = (id, e) => {
    const fd = new FormData();
    fd.append("id", id);
    fd.append("status", e.target.value);
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("activated!", {
          icon: "success",
        });
        updateStatus(fd);
      } else {
        swal("Not activated!");
      }
    });
  };

  const deactive = (id, e) => {
    console.log(e.target.value);
    const fd = new FormData();
    fd.append("id", id);
    fd.append("status", e.target.value);
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("deactivated!", {
          icon: "success",
        });
        updateStatus(fd);
      } else {
        swal("Not deactivated!");
      }
    });
  };

  const DeltetInfo = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your info has been deleted!", {
          icon: "success",
        });
        deltemydata(id);
      } else {
        swal("Your info is safe!");
      }
    });
  };

  return (
    <div className="wrapper">
      <Layout />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="col col-lg-12">
              <table className="table table-head-bg-success table-striped table-hover">
                <thead className="bg-primary text-white">
                  <tr>
                    <th scope="col">Sl </th>
                    <th scope="col">
                      <i className="fas fa-user  "></i> Name
                    </th>
                    <th scope="col">
                      <i className="fas fa-map-marker-alt "></i> GPS Lat
                    </th>
                    <th scope="col">
                      <i className="fas fa-map-marker-alt "></i> GPS Lng
                    </th>
                    <th scope="col">
                      <i className="fas fa-toggle-on "></i> Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((profile, i) => {
                    return (
                      <tr key={i}>
                        <td>{i}</td>
                        <td>{profile.Name}</td>
                        <td>{profile.currentLocation[0].lat}</td>
                        <td>{profile.currentLocation[0].lng}</td>
                        <td>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              value="active"
                              className={
                                profile.Status === "active"
                                  ? "btn btn-primary"
                                  : "disable"
                              }
                              onClick={(e) => {
                                activate(profile._id, e);
                              }}
                            >
                              <i className="la la-rocket"></i>
                              active
                            </button>
                            <button
                              type="button"
                              value="deactive"
                              className={
                                profile.Status === "deactive"
                                  ? "btn btn-secondary"
                                  : "disable"
                              }
                              onClick={(e) => {
                                deactive(profile._id, e);
                              }}
                            >
                              <i className="la la-times-circle-o"></i>
                              deactive
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger disable"
                              onClick={() => {
                                DeltetInfo(profile._id);
                              }}
                            >
                              <i className="fas fa-trash-alt"></i>
                              delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  profiles: state.Map.mydata,
  loadinguser: state.Map.loadinguser,
});

export default connect(mapStateToProps, {
  getmydata,
  deltemydata,
  updateStatus,
})(ViewValue);
