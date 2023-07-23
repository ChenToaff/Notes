import ReactDOM from "react-dom/client";
import cookie from "react-cookies";
import Login from "./pages/Login";
import "index.css";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import Navbar from "components/Navbar";
import Edit from "pages/Edit";
import Home from "pages/Home";

export default function App() {
  const loggedIn = cookie.load("token");
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route element={loggedIn ? <Outlet /> : <Navigate to="/login" />}>
            <Route path="/edit" element={<Edit />} />
          </Route>
          <Route path="/home" element={<Home />} />
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
