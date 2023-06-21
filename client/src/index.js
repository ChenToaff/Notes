import ReactDOM from "react-dom";
import React, { Component, useEffect, useState } from "react";
import cookie from "react-cookies";
import edit from "./images/edit.png";
import Home from "./components/Home";
import Login from "./components/Login";
import Edit from "./components/Edit";
import "./css/App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function App() {
  const rightBtn = React.createRef();
  const centerBtn = React.createRef();
  const [apiResponse, setApiResponse] = useState([]);
  useEffect(async () => {
    await callAPI();
  }, []);
  function callAPI() {
    fetch("http://localhost:9000/Notes/")
      .then((data) => data.json())
      .then((data) => {
        setApiResponse(data);
      });
  }
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Notes
        </a>
        <a
          id="centerBtn"
          ref={centerBtn}
          className="navbar-brand"
          href="/"
          style={{
            display: window.location.pathname === "/edit" ? "block" : "none",
          }}
        >
          <img width="30" height="30" alt="save"></img>
        </a>
        <a id="rightBtn" ref={rightBtn} className="navbar-brand" href="/login">
          <img src={edit} width="30" height="30" alt="edit"></img>
        </a>
      </nav>
      <Router>
        <Switch>
          <Route path="/login">
            {cookie.load("token") ? (
              <Redirect to="/edit" />
            ) : (
              <Login centerBtn={centerBtn} rightBtn={rightBtn} />
            )}
          </Route>
          <Route path="/edit">
            {!cookie.load("token") ? (
              <Redirect to="/login" />
            ) : (
              <Edit
                rightBtn={rightBtn}
                centerBtn={centerBtn}
                apiResponse={apiResponse}
              />
            )}
          </Route>
          <Route path="/">
            <Home apiResponse={apiResponse} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
