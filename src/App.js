import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/homePage/HomePage";
import ToDoPage from "./pages/ToDoPage/ToDoPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { BrowserRouter as Router, Switch, withRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { useRef } from "react";
import Navbar from "./components/NavBar/NavBar";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  const inputRef = useRef();

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
  };

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    inputRef.current.history.push("/");
  };

  return (
    <div className="App">
      <Router ref={inputRef}>
        <Navbar handleLogout={handleLogout} />
        <Route
          exact
          path="/"
          render={() => <HomePage handleLogin={handleLogin} />}
        />
        <Route exact path="/todopage" component={ToDoPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/admin" component={AdminPage} />
      </Router>
    </div>
  );
}

export default App;
