import React, { Component } from "react";
// import { Link } from "react-router-dom";

/* Context */
import balanceContext from "../../balanceContext";

class BudgetsList extends Component {
  state = {};

  static contextType = balanceContext;

  /* Custom Methods */

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="bugetsList">
        <h2>Your Most Recent Budget: 'Month Year Here'</h2>
        {/* List of monthly budget tables here */}
        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default BudgetsList;
