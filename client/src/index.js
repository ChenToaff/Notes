import ReactDOM from "react-dom";
import React, { Component } from "react";
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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.rightBtn = React.createRef();
    this.centerBtn = React.createRef();
    this.state = { apiResponse: [] };
  }
  async componentDidMount() {
    await this.callAPI();
  }
  callAPI() {
    fetch("http://localhost:9000/Notes/")
      .then((data) => data.json())
      .then((data) => {
        this.setState({ apiResponse: data });
      });
  }
  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Notes
          </a>
          <a
            id="centerBtn"
            ref={this.centerBtn}
            className="navbar-brand"
            href="/"
            style={{
              display: window.location.pathname === "/edit" ? "block" : "none",
            }}
          >
            <img width="30" height="30" alt="save"></img>
          </a>
          <a
            id="rightBtn"
            ref={this.rightBtn}
            className="navbar-brand"
            href="/login"
          >
            <img src={edit} width="30" height="30" alt="edit"></img>
          </a>
        </nav>
        <Router>
          <Switch>
            <Route path="/login">
              {cookie.load("token") ? (
                <Redirect to="/edit" />
              ) : (
                <Login centerBtn={this.centerBtn} rightBtn={this.rightBtn} />
              )}
            </Route>
            <Route path="/edit">
              {!cookie.load("token") ? (
                <Redirect to="/login" />
              ) : (
                <Edit
                  rightBtn={this.rightBtn}
                  centerBtn={this.centerBtn}
                  apiResponse={this.state.apiResponse}
                />
              )}
            </Route>
            <Route path="/">
              <Home apiResponse={this.state.apiResponse} />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
