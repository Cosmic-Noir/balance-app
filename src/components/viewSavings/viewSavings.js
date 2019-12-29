import React, { Component } from "react";
// import { Link } from "react-router-dom";

/* Context */
import balanceContext from "../../balanceContext";

class ViewSavings extends Component {
  state = {};

  static contextType = balanceContext;

  render() {
    return (
      <div className="viewSavings">
        <h2>Savings Report:</h2>
        {/* Savings report with graph */}
      </div>
    );
  }
}

export default ViewSavings;
