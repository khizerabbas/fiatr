import axios from "axios";
import { ADDVALUE_SUCCESS, ADDVALUE_FAIL } from "./type";
import { setAlert } from "./alert";

export const addlayer1 = (layer1, history) => async (dispatch) => {
  console.log(layer1);
  try {
    console.log("in action");
    const res = await axios.post("/api/addlayerdata", layer1);
    dispatch({
      type: ADDVALUE_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("success", "success"));
    // const timeout = setTimeout(() => {
    //   history.push("/addvalue2");
    // }, 3000);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: ADDVALUE_FAIL });
  }
};
