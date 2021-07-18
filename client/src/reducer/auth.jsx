import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  GOOGLE_AUTH_SUCCESS,
  GET_USERS,
} from "../action/type";

const initialState = {
  loading: true,
  authData: null,
  isAuthenticated: false,
  users: null,
  loadingUsers: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(action.data?.token);
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.data.token);
      localStorage.setItem("profile", JSON.stringify({ ...action.data }));

      return {
        ...state,
        authData: action.data,
        loading: false,
        isAuthenticated: true,
      };
    case GET_USERS:
      return {
        ...state,
        loadingUsers: false,
        users: payload,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        role: payload === "admin" ? true : false,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        authData: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case USER_LOADED:
      return {
        ...state,
        authData: JSON.parse(localStorage.getItem("profile")),
        isAuthenticated: true,
        loading: false,
      };

    default:
      return state;
  }
}
