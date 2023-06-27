import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Edit from "./pages/Edit";
import "./css/App.css";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  const rightBtn = React.createRef();
  const centerBtn = React.createRef();
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("/Notes/").then(async (data) => setNotes(await data.json()));
  }, []);
  const loggedIn = cookie.load("token");
  return (
    <>
      <Navbar {...{ centerBtn, rightBtn }}></Navbar>
      <BrowserRouter>
        <Routes>
          <Route element={loggedIn ? <Outlet /> : <Navigate to="/login" />}>
            <Route
              path="/edit"
              element={<Edit {...{ setNotes, rightBtn, centerBtn, notes }} />}
            />
          </Route>
          <Route path="/home" element={<Home notes={notes} />} />
          <Route
            path="/login"
            element={
              loggedIn ? <Navigate to="/edit" /> : <Login {...{ rightBtn }} />
            }
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
