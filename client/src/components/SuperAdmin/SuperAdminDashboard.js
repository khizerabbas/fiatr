import React, { useEffect } from "react";
import { connect } from "react-redux";
import ChartCircle from "./charts/DonutChart";
import { getmydata } from "../../action/getMapData";
import Layout from "./Layout/Layout";
import { LineChart } from "./charts/LineChart";
const UserDashboard = ({ mydata, loadinguser, getmydata, match }) => {
  // useEffect(() => {
  //   getmydata();
  // }, [loadinguser]);

  return (
    <div className="wrapper">
      <Layout />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Dashboard</h4>
            <div className="row">
              <div className="col-md-3">
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
                          <p className="card-category">Total Flats</p>
                          <h4 className="card-title">1,294</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
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
                          <p className="card-category">Booked Flats</p>
                          <h4 className="card-title">1,345</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card card-stats card-danger bg-danger">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-newspaper-o"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Users</p>
                          <h4 className="card-title">1303</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card card-stats card-primary bg-primary">
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-5">
                        <div className="icon-big text-center">
                          <i className="la la-check-circle"></i>
                        </div>
                      </div>
                      <div className="col-7 d-flex align-items-center">
                        <div className="numbers">
                          <p className="card-category">Orders</p>
                          <h4 className="card-title">576</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 mt-5">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Task</h4>
                    <p className="card-category">Complete</p>
                  </div>
                  <div className="card-body">
                    <ChartCircle />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 mt-5">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">USER ENGAGES</h4>
                    <p className="card-category">Total Users</p>
                    <p className="card-category">1000</p>
                  </div>
                  <div className="card-body">
                    <LineChart />
                  </div>
                  {/* <div className="card-footer">
                    <div className="legend">
                      <i className="la la-circle text-primary"></i> Completed
                    </div>
                  </div> */}
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
