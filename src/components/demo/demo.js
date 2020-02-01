import React, { Component } from "react";
import "./demo.css";

class Demo extends Component {
  state = {
    phase: "phase_one"
  };

  render() {
    return (
      <div className="demo">
        {this.state.phase === "phase_one" ? (
          <div className="phase_one tip">
            <h2>
              Welcome to your demo tour! This breif tutorial will show you how
              the app works.
            </h2>
            <button className="main_button" id="phase_one" type="button">
              Next
            </button>
          </div>
        ) : (
          ""
        )}
        {this.state.phase === "phase_two" ? "" : ""}
        {this.state.phase === "phase_three" ? "" : ""}
        {this.state.phase === "phase_four" ? "" : ""}
        {this.state.phase === "phase_five" ? "" : ""}
      </div>
    );
  }
}

export default Demo;
