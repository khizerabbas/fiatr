import axios from "axios";
import { GET_MAP_DATA, GET_MYDATA, DELETE_MYDATA, UPDATE_STATUS } from "./type";

export const getMapData = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/getmapdata");
    dispatch({
      type: GET_MAP_DATA,
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getmydata = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/getmapdata/mydata");
    dispatch({
      type: GET_MYDATA,
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deltemydata = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/deletemydata/${id}`);
    dispatch({
      type: DELETE_MYDATA,
      payload: res,
    });
    console.log(res.data._id);
  } catch (err) {
    console.log(err);
  }
};

export const updateStatus = (fd) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/status/", fd, config);
    dispatch({
      type: UPDATE_STATUS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};
