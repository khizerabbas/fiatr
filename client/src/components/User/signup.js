import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { connect } from "react-redux";
import { register } from "../../action/auth";
import { setAlert } from "../../action/alert";
import Alert from "../alert/alert";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "react-google-login";
import "./css/signup.css";
import { Link, useHistory } from "react-router-dom";
import "./css/Auth.css";
import ReCaptchaV2 from "react-google-recaptcha";
import { FcGoogle } from "react-icons/fc";
const Signup = (props) => {
  const [formData, SetFormData] = useState({
    firstname: " ",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });
  const [currentForm, setForm] = useState({
    token: null,
  });

  const onChange = (e) =>
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  const { firstname, lastname, email, password, password2 } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (password !== password2) {
      props.setAlert("password not matching", "danger");
    } else if (currentForm.token === null) {
      props.setAlert("verification required");
    } else {
      props.register({ firstname, lastname, email, password, history });
    }
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const clientId =
    "957563671568-q0lfln1eqhmrifqv4tk977ga8e932mrn.apps.googleusercontent.com";
  const onSuccess = async (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
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
  const TEST_SITE_KEY = "6Lf8W1obAAAAAITZybyvpOSfJEmqATlOh0t0GVQq";

  const handleToken = (token) => {
    setForm((currentForm) => {
      return { ...currentForm, token };
    });
  };
  const handleExpire = () => {
    setForm((currentForm) => {
      return { ...currentForm, token: null };
    });
  };

  return (
    <div>
      <div>
        <div className="login-form" onSubmit={(e) => onSubmit(e)}>
          <form>
            <Alert />
            <h2 className="text-center">Sign Up</h2>
            <div className="text-center social-btn">
              <a onClick={signIn} className="btn btn-primary btn-block">
                <FcGoogle fontSize={25} /> Sign Up with <b>Google</b>
              </a>
            </div>
            <div className="or-seperator">
              <i>or</i>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  {/* <span className="input-group-text">
                    <span className="fa fa-user"></span>
                  </span> */}
                </div>
                <input
                  className="form-control"
                  type="text"
                  required=""
                  placeholder="Username"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  {/* <span className="input-group-text">
                    <span className="fa fa-user"></span>
                  </span> */}
                </div>
                <input
                  className="form-control"
                  type="text"
                  required=""
                  placeholder="Last name"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  {/* <span className="input-group-text">
                    <span className="fa fa-user"></span>
                  </span> */}
                </div>
                <input
                  type="text"
                  className="form-control"
                  required="required"
                  placeholder="email"
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
                  {/* <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span> */}
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
              <div className="input-group">
                <div className="input-group-prepend">
                  {/* <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span> */}
                </div>
                <input
                  className="form-control"
                  type="password"
                  required=""
                  placeholder="Confirm Your password"
                  name="password2"
                  value={password2}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              </div>
            </div>
            <ReCaptchaV2
              sitekey={TEST_SITE_KEY}
              onChange={handleToken}
              onExpire={handleExpire}
            />
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success btn-block login-btn"
              >
                Sign Up
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Signup);
