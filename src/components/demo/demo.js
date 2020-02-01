import React, { Component } from "react";
import "./demo.css";

class Demo extends Component {
  state = {
    phase: ""
  };

  render() {
    return (
      <div className="demo">
        <h2>This is your demo tour!</h2>
      </div>
    );
  }
}

export default Demo;
