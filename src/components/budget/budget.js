import React, { Component } from "react";
import { Link } from "react-router-dom";

/* Custom Components */
import Charge from "../charge/charge";

/* Styling & Images */
import "./budget.css";

/* Context */
import balanceContext from "../../balanceContext";

// Should turn into function when can test
class Budget extends Component {
  state = {
    report: "",
    charges: []
  };

  static contextType = balanceContext;

  /* State Setting Methods */

  setCharges = () => {
    // console.log(this.context.charges);
    let charges = this.context.charges.map(charge => {
      // console.log(charge);
      if (charge.month_id === parseInt(this.props.match.params.month_id)) {
        // console.log("matching charge found");
        return charge;
      } else {
        return "";
      }
    });
    this.setState({ charges: charges });

    // console.log("setCharges ran");
  };

  /* Custom Methods */
  // Need to sort charges by date

  displayCharges = () => {
    let totIncome = 0;
    let totExpenses = 0;

    const allCharges = this.state.charges.map(charge => {
      const { charge_id, charge_name, due_date, amount } = charge;
      if (charge.category === "Income") {
        let currentRemainder = totIncome + totExpenses;
        totIncome += charge.amount;
        totExpenses = 0;
        return (
          <div className="width-100">
            <div className="checkRemainder">
              <li className={currentRemainder > 0 ? "green" : "red"}>
                {currentRemainder > 0 ? "Remaining: " : "Need to Save: "}{" "}
                {currentRemainder}
              </li>
            </div>

            <div className="Income">
              <li className="detail">{charge.due_date}</li>
              <li className="detail">{charge.charge_name}</li>
              <li className="detail">{charge.amount}</li>
            </div>
          </div>
        );
      } else {
        totExpenses -= charge.amount;
        return (
          <Charge
            amount={amount}
            due_date={due_date}
            charge_name={charge_name}
            key={charge_id}
          />
        );
      }
    });
    return allCharges;
  };

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    this.setCharges();
  }

  render() {
    const { month_name } = this.state.report;
    return (
      <div className="budgetReport flex-column">
        <h2 className="title">Budget Report</h2>
        <h3>{month_name}</h3>
        <div className="flex-column report">{this.displayCharges()}</div>
        <Link to={`/monthlyReports/${this.props.month_id}`} className="block">
          <h3 className="month_name">Next or Previous Month</h3>
        </Link>
        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default Budget;
