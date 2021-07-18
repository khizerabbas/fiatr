import React, { useEffect } from "react";

import { connect } from "react-redux";
import Layout from "./Layout/Layout";
import { getUsers } from "../../action/auth";
import { Loader } from "../Loader/Loader";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

const Users = ({ getUsers, users, loading }) => {
  useEffect(() => {
    getUsers();
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }, []);
  if (loading || !users) {
    return <Loader />;
  }

  return (
    <div>
      <div class="wrapper">
        <Layout />
        <div class="main-panel">
          <div class="content">
            <div class="container-fluid">
              <h4 class="page-title">Users</h4>
              <div className="col col-lg-12 ">
                <div className="card p-5">
                  <table
                    id="example"
                    class="table table-striped table-bordered"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Start date</th>
                        <th>Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, k) => {
                        return (
                          <tr>
                            <td>{k + 1}</td>
                            <td>{user.firstname}</td>
                            <td>{user.email}</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Age</th>
                        <th>Start date</th>
                        <th>Salary</th>
                      </tr>
                    </tfoot>
                  </table>
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
  users: state.auth.users,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { getUsers })(Users);
