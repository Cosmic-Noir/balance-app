import React, { Component } from "react";
// import { Link } from "react-router-dom";

/* Custom Components */
import Charge from "../charge/charge";

/* Context */
import balanceContext from "../../balanceContext";

// Should turn into function when can test
class BudgetReport extends Component {
  state = {
    report: "",
    charges: []
  };

  static contextType = balanceContext;

  /* State Setting Methods */

  setCharges = () => {
    console.log(this.context.charges);
    let charges = this.context.charges.map(charge => {
      console.log(charge);
      if (charge.month_id === parseInt(this.props.match.params.month_id)) {
        console.log("matching charge found");
        return charge;
      } else {
        return "";
      }
    });
    this.setState({ charges: charges });

    console.log("setCharges ran");
  };

  setReport = () => {
    let report = this.context.monthlyReports.map(report => {
      // console.log("Searching for match...");
      // console.log(typeof this.props.match.params.month_id);
      // console.log(typeof report.month_id);
      if (report.month_id === parseInt(this.props.match.params.month_id)) {
        // console.log("matching report found");
        return report;
      } else {
        return "";
      }
    });
    this.setState({ report: report[0] });
  };
  /* Custom Methods */

  displayCharges = () => {
    const allCharges = this.state.charges.map(charge => {
      const { charge_id, charge_name, due_date, amount } = charge;
      return (
        <Charge
          amount={amount}
          due_date={due_date}
          charge_name={charge_name}
          key={charge_id}
        />
      );
    });
    return allCharges;
  };

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    this.setReport();
    this.setCharges();
  }

  render() {
    const { month_name } = this.state.report;
    return (
      <div className="budgetReport flex-column">
        <h2 className="title">Budget Report</h2>
        <h3>{month_name}</h3>
        <table>{this.displayCharges()}</table>
        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default BudgetReport;
