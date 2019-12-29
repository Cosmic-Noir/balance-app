import React, { Component } from "react";
import { Link } from "react-router-dom";

/* Context */
import balanceContext from "../../balanceContext";

// Should turn into function when can test
class BudgetReport extends Component {
  static contextType = balanceContext;

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="budgetReport flex-column">
        <h2 className="title">Budget Report</h2>
        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default BudgetReport;
