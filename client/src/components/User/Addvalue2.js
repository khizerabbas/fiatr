import React, { useState } from "react";
import { addMapData } from "../../action/addMapData";
import { connect } from "react-redux";
import Alert from "../alert/alert";

import { Link } from "react-router-dom";
import Layout from "./Layout/Layout";

const Addvalue2 = ({
  addMapData,
  location: {
    state: { formData, id },
  },
}) => {
  const [formData2, setFormData2] = useState({
    photo: "",
    description: "",
  });

  const { description, photo } = formData2;

  const onChange = (e) =>
    setFormData2({ ...formData2, [e.target.name]: e.target.value });

  const fileChange = (e) => {
    setFormData2({ ...formData2, photo: e.target.files[0] });
  };

  ///////////////////////////////////////////////////onsubmit

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("roomImage", formData2.photo);
    fd.append("description", formData2.description);
    fd.append("roomRent", formData.roomRent);
    fd.append("lat", formData.lat);
    fd.append("lng", formData.lng);
    fd.append("Name", formData.Name);
    fd.append("roomConfig", formData.roomConfig);
    fd.append("floor", formData.floor);
    fd.append("facing", formData.facing);
    fd.append("contactNo", formData.contactNo);
    fd.append("depositAmount", formData.depositAmount);
    addMapData(fd);
  };

  return (
    <div class="wrapper">
      <Layout />
      <div class="main-panel">
        <div class="content">
          <div class="container-fluid">
            <div className="container d-flex align-items-center">
              <div className="col col-md-6">
                <h4 className="text-center">Add value</h4>
                <div className="card p-4 m-5">
                  <Alert />
                  <form
                    onSubmit={(e) => {
                      onSubmit(e);
                    }}
                    encType="multipart/form-data"
                  >
                    <div className="col-md-12 ">
                      <input
                        className="form-control"
                        type="file"
                        name="roomImg"
                        placeholder="upload img"
                        onChange={(e) => {
                          fileChange(e);
                        }}
                      />
                    </div>
                    <div className="col-md-12 my-3">
                      <h5>Description</h5>
                      <div class="form-group">
                        <label for="exampleFormControlTextarea1">
                          Describe
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          type="text"
                          name="description"
                          value={description}
                          onChange={(e) => {
                            onChange(e);
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <input type="submit" className="btn btn-success" />
                  </form>
                  <Link to="/addvalue">
                    <button className="btn btn-primary">Back</button>
                  </Link>
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
  loadinguser: state.Map.loadinguser,
});
export default connect(mapStateToProps, { addMapData })(Addvalue2);
