import axios from "axios";
import { ADDVALUE_SUCCESS, ADDVALUE_FAIL } from "./type";
import { setAlert } from "./alert";

export const addMapData = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/v1/addMapData/", formData);
    dispatch({
      type: ADDVALUE_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("success", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: ADDVALUE_FAIL });
  }
};
