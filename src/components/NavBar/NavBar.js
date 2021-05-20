import React, { useEffect, useState } from "react";
import "./styles.css";
import { Spinner } from "react-bootstrap";
import { withRouter } from "react-router";

const Navbar = (props) => {
  const { handleLogout } = props;
  const [localToken, setlocalToken] = useState();

  useEffect(() => {
    setlocalToken(localStorage.getItem("token"));
  });

  return (
    <div>
      <nav className="navbar navbar-custom navbarColor">
        <div className="container">
          <h className="navbarTitle">TO DO LIST APP</h>
          {localToken && (
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handleLogout}
            >
              Log out
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Navbar);
