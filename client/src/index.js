import ReactDOM from "react-dom/client";
import React, { createContext, useEffect, useState, useContext } from "react";
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

export const setNotesContext = createContext();

export default function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("/Notes/").then(async (data) => setNotes(await data.json()));
  }, []);
  const loggedIn = cookie.load("token");
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route element={loggedIn ? <Outlet /> : <Navigate to="/login" />}>
            <Route
              path="/edit"
              element={
                <setNotesContext.Provider value={setNotes}>
                  <Edit {...{ notes }} />
                </setNotesContext.Provider>
              }
            />
          </Route>
          <Route path="/home" element={<Home notes={notes} />} />
          <Route
            path="/login"
            element={loggedIn ? <Navigate to="/edit" /> : <Login />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
