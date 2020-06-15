import React, { Component } from "react";
import cookie from "react-cookies";
import back from "../images/back.png";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.rightBtn = props.rightBtn;
  }
  componentDidMount() {
    this.rightBtn.current.href = "/";
    this.rightBtn.current.firstChild.src = back;
    //this.centerBtn.style.display = "none";
  }
  logIn() {
    cookie.save("token", "True", { path: "/" });
  }
  render() {
    return (
      <form
        onSubmit={() => {
          this.logIn();
          return false;
        }}
        className="form-signin text-center needs-validation"
      >
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          pattern="(Admin|admin)"
          required
          autoFocus
        />
        <input
          type="password"
          name="form_password"
          className="form-control"
          placeholder="Password"
          required
          pattern="(Admin|admin)"
        ></input>
        <button className="btn btn-dark" type="submit">
          Sign in
        </button>
      </form>
    );
  }
}
