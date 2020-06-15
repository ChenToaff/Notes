import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: props.apiResponse };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.apiResponse !== state.apiResponse)
      return {
        apiResponse: props.apiResponse,
      };
    return null;
  }

  render() {
    let data = this.state.apiResponse || [];
    if (!data) data = [];
    const Notes = [];

    for (let i = data.length - 1; i >= 0; i--) {
      const Elements = [];
      for (let j = 0; j < data[i].Elements.length; j++) {
        if (data[i].Elements[j].Type == "Header")
          Elements.push(
            <h4 key={`N${i}E${j}`}>{data[i].Elements[j].Content}</h4>
          );
        else
          Elements.push(
            <p className="m-0" key={`N${i}E${j}`}>
              {data[i].Elements[j].Content}
            </p>
          );
      }
      Notes.push(
        <div key={`N${i}`} className="catg-card rounded font-italic">
          <div className="bg-dark text-light">
            <h1>{data[i].Title}</h1>
            {Elements}
          </div>
        </div>
      );
    }
    return <div className="m-auto text-center">{Notes}</div>;
  }
}
