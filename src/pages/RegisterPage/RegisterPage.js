import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { useHistory } from "react-router";

const RegisterPage = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    role: null,
    error: null,
  });

  const signUpClicked = (e) => {
    e.preventDefault();
    axios
      .post("/users/register", {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
        role: userInfo.role,
      })
      .then((result) => {
        history.push("/");
      })
      .catch((err) => {
        setUserInfo({ ...userInfo, error: err.response.data.error });
      });
  };

  const token = localStorage.getItem("token");

  const handleEvent = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="divCard">
      {token ? (
        <div class="centerClass">
          You are logged in. Please click log out button and try again.
        </div>
      ) : (
        <>
          <h1 class="centerClass">Sign up. It's quick and easy.</h1>
          <form class="form-horizontal ">
            <div class="form-group vertical ">
              <label for="inputEmail3" class="col-sm-4 control-label">
                First Name:
              </label>
              <div class="col-sm-5  form-auto">
                <input
                  name="firstName"
                  type="text"
                  class="form-control"
                  id="inputEmail3"
                  onChange={handleEvent}
                />
              </div>
            </div>
            <div class="form-group vertical">
              <label for="inputEmail3" class="col-sm-4 control-label">
                Last Name:
              </label>
              <div class="col-sm-5">
                <input
                  name="lastName"
                  type="text"
                  class="form-control"
                  id="inputEmail3"
                  onChange={handleEvent}
                />
              </div>
            </div>
            <div class="form-group vertical">
              <label for="inputEmail3" class="col-sm-4 control-label">
                Email:
              </label>
              <div class="col-sm-5">
                <input
                  autocomplete="false"
                  name="email"
                  type="email"
                  class="form-control"
                  id="inputEmail3"
                  onChange={handleEvent}
                />
              </div>
            </div>
            <div class="form-group vertical">
              <label for="inputPassword3" class="col-sm-4 control-label">
                Password:
              </label>
              <div class="col-sm-5">
                <input
                  autocomplete="false"
                  name="password"
                  type="password"
                  class="form-control"
                  id="inputPassword3"
                  onChange={handleEvent}
                />
              </div>
            </div>
            <div class="form-group vertical">
              <label for="inputEmail3" class="col-sm-4 control-label">
                Your role:
              </label>
              <div class="col-sm-5  form-auto">
                <select
                  name="role"
                  type="text"
                  class="form-control"
                  id="inputEmail3"
                  onChange={handleEvent}
                >
                  <option></option>
                  <option>User</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
            {userInfo.error && (
              <div
                class="col-sm-12 mb-3 errorMessage"
                role="alert"
                style={{ color: "red" }}
              >
                Error: {userInfo.error}.
              </div>
            )}
            <div>
              <button
                type="submit"
                class="col-sm-4 btn btn-primary mb-3 ml-4"
                onClick={signUpClicked}
              >
                Sign Up
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
