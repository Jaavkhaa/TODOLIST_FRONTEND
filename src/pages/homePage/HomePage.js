import React, { useState } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const HomePage = (props) => {
  const { handleLogin } = props;

  const history = useHistory();
  const [login, setLogin] = useState({
    email: null,
    password: null,
  });

  const [error, setError] = useState();

  const registerClicked = () => {
    history.push("register");
  };

  const loginClicked = (e) => {
    e.preventDefault();
    axios
      .post("/users/login", {
        email: login.email,
        password: login.password,
      })
      .then((result) => {
        handleLogin(result.data.token);
        result.data.user.role === "User"
          ? history.push("/todopage")
          : history.push("/Admin");
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  const handleEvent = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const token = localStorage.getItem("token");

  return (
    <div className="loginCart">
      {token ? (
        <div class="centerClass">
          You are logged in. Please click log out button and try again.
        </div>
      ) : (
        <>
          <h1 class="centerClass">Sign in to continue</h1>
          <form class="form-horizontal ">
            <div class="form-group vertical">
              <label for="staticEmail" class="col-sm-4 col-form-label">
                Email:
              </label>
              <div class="col-sm-5">
                <input
                  name="email"
                  type="text"
                  class="form-control"
                  id="staticEmail"
                  value={login.email}
                  onChange={handleEvent}
                />
              </div>
            </div>

            <div class="form-group vertical">
              <label for="inputPassword" class="col-sm-4 control-label">
                Password:
              </label>
              <div class="col-sm-5">
                <input
                  name="password"
                  type="password"
                  class="form-control"
                  id="inputPassword"
                  value={login.password}
                  onChange={handleEvent}
                />
              </div>
            </div>
            <div>
              {error && (
                <div class="ml-3 errorBack" role="alert">
                  Error: {error}.
                </div>
              )}
            </div>
            <div class="blueButton">
              {/* class="col-auto" */}
              <button
                type="submit"
                class="col-sm-3 btn btn-primary mt-3 mb-3 ml-3"
                onClick={loginClicked}
              >
                Sign In
              </button>
              <button
                type="submit"
                class="col-sm-3 btn btn-primary mt-3 mb-3 ml-3"
                onClick={registerClicked}
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

export default HomePage;
