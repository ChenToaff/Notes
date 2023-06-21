import React, { Component, useEffect, useState } from "react";
import cookie from "react-cookies";
import logout from "../images/logout.png";
import add from "../images/add.png";
import save from "../images/save.png";
import "../css//Edit.css";
import axios from "axios";
import EditableNote from "./EditableNote";

export default function Edit({ rightBtn, centerBtn, apiResponse }) {
  const [apiResponseNew, setApiResponse] = useState(apiResponse);
  useEffect(() => {
    rightBtn.current.href = "/login";
    rightBtn.current.firstChild.src = logout;
    rightBtn.current.onclick = () => cookie.remove("token", { path: "/" });
    centerBtn.current.firstChild.src = save;
    centerBtn.current.onclick = () => this.saveAll();
  }, []);

  async function saveAll() {
    await axios.post(
      "http://localhost:9000/Notes/changes",
      this.state.apiResponseNew,
      {
        headers: { token: cookie.load("token") },
      }
    );
  }
  function handleChange(event) {
    let newResponse = this.state.apiResponseNew;
    let id = event.target.id;
    if (id.includes("E"))
      newResponse[parseInt(id[1])]["Elements"][parseInt(id[3])].Content =
        event.target.value;
    else newResponse[parseInt(id[1])].Title = event.target.value;
    this.setState({ apiResponseNew: newResponse });
  }

  function addElement(name = null, Type = null) {
    let newResponse = apiResponseNew;
    if (name)
      newResponse[parseInt(name[1])]["Elements"].push({
        Type: Type,
        Content: "",
      });
    else newResponse.push({ Title: "", Elements: [] });
    setApiResponse(newResponse);
  }
  function deleteElement(name) {
    let newResponse = apiResponseNew;
    if (name.includes("E"))
      delete newResponse[parseInt(name[1])]["Elements"][parseInt(name[3])];
    else delete newResponse[parseInt(name[1])];
    setApiResponse(newResponse);
  }

  return (
    <>
      <div className="m-auto text-center">
        {apiResponse.map((note, i) => (
          <EditableNote
            handleChange={handleChange}
            deleteElement={deleteElement}
            addElement={addElement}
            note={note}
            title={note.Title}
            i={i}
          ></EditableNote>
        ))}
      </div>
      <div className="fixed-bottom m-3">
        <img
          style={{ cursor: "pointer" }}
          src={add}
          height="50px"
          width="50px"
          className="float-right rounded-circle"
          onClick={() => {
            addElement();
          }}
          alt="add"
        ></img>
      </div>
    </>
  );
}
