import React, { Component } from "react";
// import { Link } from "react-router-dom";

/* Custom Components */
import BudgetPreview from "../budgetPreview/budgetPreview";

/* Context */
import balanceContext from "../../balanceContext";

class BudgetsList extends Component {
  state = {};

  static contextType = balanceContext;

  /* Custom Methods */

  displayMonthlyReports = () => {
    const reports = this.context.monthlyReports.map(report => {
      const { month_id, user_id, month_name } = report;
      return (
        <BudgetPreview
          key={month_id}
          user_id={user_id}
          month_name={month_name}
        />
      );
    });
    return reports;
  };

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="bugetsList">
        <h2>Your Most Recent Budget: 'Month Year Here'</h2>
        {this.displayMonthlyReports()}
        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default BudgetsList;
