import React, { useState } from "react";
import { login, loadUser } from "../../action/auth";
import { setAlert } from "../../action/alert";
import { connect } from "react-redux";
import Alert from "../alert/alert";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "react-google-login";
import { REGISTER_SUCCESS } from "../../action/type";
import { Link, Redirect, useHistory } from "react-router-dom";
import "./css/Auth.css";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";

const Login = ({ login, isAuthenticated, loadUser }) => {
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { email, password } = formData;
  const onChange = (e) =>
    SetFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password, history });
  };
  const clientId =
    "957563671568-q0lfln1eqhmrifqv4tk977ga8e932mrn.apps.googleusercontent.com";
  const onSuccess = async (res) => {
    const token = res?.tokenId;
    const result = res?.profileObj;
    console.log(result);
    const user = {
      firstname: result.name,
      avatar: result.imageUrl,
      email: result.email,
      lastname: result.familyName,
    };
    try {
      dispatch({ type: REGISTER_SUCCESS, data: { user, token } });
      history.push("/userdashboard");

      dispatch(loadUser());
    } catch (error) {
      console.log(error);
    }
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
  });

  return (
    <div>
      <div className="login-form" onSubmit={(e) => onSubmit(e)}>
        <form>
          <Alert />
          <h2 className="text-center">Sign in</h2>
          <div className="text-center social-btn">
            <a onClick={signIn} className="btn btn-primary">
              <FcGoogle /> Sign in with <b>Google</b>
            </a>
          </div>
          <div className="or-seperator">
            <i>or</i>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="fa fa-user"></span>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                required="required"
                name="email"
                value={email}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required="required"
                name="password"
                value={password}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-success btn-block login-btn"
            >
              Sign in
            </button>
          </div>
          <div className="clearfix">
            <label className="float-left form-check-label">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="float-right text-success">
              Forgot Password?
            </a>
          </div>
        </form>
        <div className="hint-text">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-success">
            Register Now!
          </Link>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, setAlert, loadUser })(Login);
