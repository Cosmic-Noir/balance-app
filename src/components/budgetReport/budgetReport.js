import React, { Component } from "react";
// import { Link } from "react-router-dom";

/* Context */
import balanceContext from "../../balanceContext";

// Should turn into function when can test
class BudgetReport extends Component {
  state = {
    report: ""
  };

  static contextType = balanceContext;

  setReport = () => {
    const report = this.context.monthlyReports.map(report => {
      if (report.month_id === this.props.match.params.month_id) {
        console.log("matching report found");
        this.setState({ report: report });
      }
    });
  };
  /* Custom Methods */

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    this.setReport();
  }

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
