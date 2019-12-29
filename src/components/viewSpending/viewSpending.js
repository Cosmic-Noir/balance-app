import React, { Component } from "react";
import { Link } from "react-router-dom";

/* Context */
import balanceContext from "../../balanceContext";

class viewSpending extends Component {
  state = {};

  static contextType = balanceContext;

  render() {
    return (
      <div className="viewSpending">
        <h2>Spending Report:</h2>
        {/* Spending report with pie graph */}
      </div>
    );
  }
}

export default viewSpending;
