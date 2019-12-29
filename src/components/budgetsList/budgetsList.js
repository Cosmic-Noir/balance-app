import React, { Component } from "react";
import { Link } from "react-router-dom";

/* Context */
import balanceContext from "../../balanceContext";

class BudgetsList extends Component {
  state = {};

  static contextType = balanceContext;

  render() {
    return (
      <div className="bugetsList">
        <h2>Your Most Recent Budget: 'Month Year Here'</h2>
        {/* List of monthly budget tables here */}
        //
      </div>
    );
  }
}

export default BudgetsList;
