import React, { Component } from "react";
import cookie from "react-cookies";
import logout from "../images/logout.png";
import add from "../images/add.png";
import save from "../images/save.png";
import "../css//Edit.css";
import axios from "axios";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: props.apiResponse };
    this.rightBtn = props.rightBtn;
    this.centerBtn = props.centerBtn;
    this.handleChange = this.handleChange.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.apiResponse !== state.apiResponse)
      return {
        apiResponse: props.apiResponse,
      };
    return null;
  }
  componentDidMount() {
    this.rightBtn.current.href = "/login";
    this.rightBtn.current.firstChild.src = logout;
    this.rightBtn.current.onclick = () => this.logOut();
    this.centerBtn.current.firstChild.src = save;
    this.centerBtn.current.onclick = () => this.saveAll();
  }
  async saveAll() {
    await axios.post(
      "http://localhost:9000/Notes/changes",
      this.state.apiResponse,
      {
        headers: { token: cookie.load("token") },
      }
    );
  }
  handleChange(event) {
    let newResponse = this.state.apiResponse;
    let id = event.target.id;
    if (id.includes("E"))
      newResponse[parseInt(id[1])]["Elements"][parseInt(id[3])].Content =
        event.target.value;
    else newResponse[parseInt(id[1])].Title = event.target.value;
    this.setState({ apiResponse: newResponse });
  }
  logOut() {
    cookie.remove("token", { path: "/" });
  }
  addElement(name = null, Type = null) {
    let newResponse = this.state.apiResponse;
    if (name)
      newResponse[parseInt(name[1])]["Elements"].push({
        Type: Type,
        Content: "",
      });
    else newResponse.push({ Title: "", Elements: [] });
    this.setState({ apiResponse: newResponse });
  }
  deleteElement(name) {
    let newResponse = this.state.apiResponse;
    if (name.includes("E"))
      delete newResponse[parseInt(name[1])]["Elements"][parseInt(name[3])];
    else delete newResponse[parseInt(name[1])];
    this.setState({ apiResponse: newResponse });
  }
  render() {
    let data = this.state.apiResponse;
    if (!data) data = [];
    const Notes = [];

    for (let i = data.length - 1; i >= 0; i--) {
      const Elements = [];
      if (!data[i]) continue;
      for (let j = 0; j < data[i].Elements.length; j++) {
        if (!data[i].Elements[j]) continue;
        Elements.push(
          <div key={`N${i}E${j}`} className="input-group">
            <button
              onClick={() => {
                this.deleteElement(`C${i}E${j}`);
              }}
            >
              -
            </button>
            {data[i].Elements[j].Type === "Header" ? (
              <input
                id={`N${i}E${j}`}
                className="Edit-h"
                placeholder="Header"
                defaultValue={data[i].Elements[j].Content}
                onChange={this.handleChange}
              />
            ) : (
              <textarea
                id={`N${i}E${j}`}
                className="Edit-p"
                placeholder="Text"
                defaultValue={"" + data[i].Elements[j].Content}
                onChange={this.handleChange}
              />
            )}
          </div>
        );
      }
      Elements.push(
        <div key={"A" + i} className="input-group ">
          <button
            onClick={() => {
              this.addElement("A" + i, "Header");
            }}
          >
            + Header
          </button>
          <button
            onClick={() => {
              this.addElement("A" + i, "Text");
            }}
          >
            + Text
          </button>
        </div>
      );
      Notes.push(
        <div key={"N" + i} className="catg-card rounded">
          <button
            onClick={() => {
              this.deleteElement("N" + i);
            }}
            className="float-right Edit-delete"
          >
            X
          </button>
          <div className="bg-dark text-light">
            <input
              id={"C" + i}
              placeholder="Title"
              className="Edit-Title"
              defaultValue={data[i].Title}
              onChange={this.handleChange}
            ></input>
            {Elements}
          </div>
        </div>
      );
    }
    return (
      <>
        <div className="m-auto text-center">{Notes}</div>
        <div className="fixed-bottom m-3">
          <img
            style={{ cursor: "pointer" }}
            src={add}
            height="50px"
            width="50px"
            className="float-right rounded-circle"
            onClick={() => {
              this.addElement();
            }}
            alt="add"
          ></img>
        </div>
      </>
    );
  }
}
