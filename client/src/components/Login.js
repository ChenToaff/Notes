import React, { Component, useEffect } from "react";
import cookie from "react-cookies";
import back from "../images/back.png";

export default function Login({ rightBtn }) {
  useEffect(() => {
    rightBtn.current.href = "/";
    rightBtn.current.firstChild.src = back;
  }, []);

  return (
    <form
      onSubmit={() => {
        cookie.save("token", "True", { path: "/" });
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
