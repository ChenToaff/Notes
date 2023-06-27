import React from "react";
import edit from "../images/edit.png";

export default function Navbar({ centerBtn, rightBtn }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand ps-3" href="/">
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
  );
}
