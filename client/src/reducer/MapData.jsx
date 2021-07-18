import {
  ADDVALUE_SUCCESS,
  DELETE_MYDATA,
  GET_MAP_DATA,
  GET_MYDATA,
  UPDATE_STATUS,
  PARAMETER_CHANGE,
  FACING_CHANGE,
  CONFIG_CHANGE,
} from "../action/type";
const initialState = {
  mapData: [null],
  loading: true,
  mydata: [null],
  loadinguser: true,
  current_parameter: "Rent",
  current_facing: "",
  current_config: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADDVALUE_SUCCESS:
      return {
        ...state,
        mapData: payload.data,
        loadinguser: false,
      };
    case GET_MAP_DATA:
      return {
        ...state,
        mapData: payload.data,
        loading: false,
      };
    case GET_MYDATA:
      return {
        ...state,
        mydata: payload.data,
        loadinguser: false,
      };
    case DELETE_MYDATA:
      return {
        ...state,
        mydata: state.mydata.filter((data) => data._id !== payload.data._id),
      };
    case UPDATE_STATUS:
      return {
        ...state,
        mydata: payload.data,
      };
    case PARAMETER_CHANGE:
      console.log(action.data);
      return {
        ...state,
        current_parameter: action.data,
      };
    case FACING_CHANGE:
      return {
        ...state,
        current_facing: action.data,
      };
    case CONFIG_CHANGE:
      return {
        ...state,
        current_config: action.data,
      };
    default:
      return state;
  }
}
