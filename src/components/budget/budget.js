import React, { Component } from "react";
// import { Link } from "react-router-dom";

/* Custom Components */
import Charge from "../charge/charge";

/* Styling & Images */
import "./budget.css";

/* Context */
import balanceContext from "../../balanceContext";

// Should turn into function when can test
class Budget extends Component {
  state = {
    charges: [],
    month_name: "",
    months: []
  };

  static contextType = balanceContext;

  /* State Setting Methods */
  updateMonth = month_name => {
    this.setState({ month_name: month_name });
    console.log("updateMonth ran");
    this.setCharges();
  };

  // Responsible for sortilng charges in context and updating state to match selected month_name
  setCharges = () => {
    // console.log(this.context.charges);

    let charges = this.context.charges.filter(charge => {
      // console.log(charge);

      if (charge.month_name === this.state.month_name) {
        console.log("matching charge found");
        return charge;
      } else {
        return "";
      }
    });
    this.setState({ charges: charges });
    console.log(`setCharges has run and setState`);
    // this.returnElement();
  };

  /* Custom Methods */

  // Responsible for providing options of monthly budgets
  displayMonths = () => {
    const months = {};

    return this.context.charges.map(charge => {
      const { month_name } = charge;

      if (months[month_name] === true) {
        return null;
      }
      months[month_name] = true;

      return (
        <option value={month_name} key={month_name}>
          {month_name}
        </option>
      );
    });
  };

  returnElement = () => {
    let totalIncome = 0;
    let totalExpenses = 0;
    let currentPaycheck = 0;
    let expenses = 0;

    let arr = this.state.charges;
    console.log(arr);

    for (let i = 0; i <= arr.length; i++) {
      if (arr[i] === undefined) {
        let remainder = currentPaycheck + expenses;
        console.log(`${remainder} left over from paycheck`);
        console.log(
          `Monthly Income: ${totalIncome}. Montly Expenses: ${totalExpenses}. Montlhy leftover: ${totalIncome +
            totalExpenses}`
        );
      } else if (arr[i].category !== "Income") {
        let { amount, due_date, charge_name, charge_id } = arr[i];

        expenses -= arr[i].amount;
        totalExpenses -= arr[i].amount;
        console.log(
          `${arr[i].charge_name} added to expnses: ${arr[i].amount} total: ${expenses}`
        );
        return (
          <Charge
            amount={amount}
            due_date={due_date}
            charge_name={charge_name}
            key={charge_id}
          />
        );
      } else if (arr[i].category === "Income") {
        // if income, calculate previous paychecks remainder
        let remainder = currentPaycheck + expenses;
        console.log(
          `Current paycheck: ${currentPaycheck} means ${remainder} left over from paycheck`
        );
        // Then set the current paycheck to the selected one
        currentPaycheck = arr[i].amount;
        totalIncome += arr[i].amount;
        // Then reset expenses
        expenses = 0;
        console.log("---------");
        console.log(`Yay, a paycheck for ${arr[i].amount}`);
      }
    }
  };

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    let month_name = document.getElementById("month_name").value;
    console.log(month_name);
    this.setState({ month_name: month_name });
    this.setCharges();
  }

  render() {
    const { month_name } = this.state.month_name;
    return (
      <div className="budgetReport flex-column">
        <h2 className="title">Budget Report</h2>
        <form className="siteList">
          <h3>Select Budget:</h3>
          <select
            id="month_name"
            name="month_name"
            onChange={e => this.updateMonth(e.target.value)}
            ref={this.state.month_name}
            value={this.state.month_name}
          >
            {/* <option>Select</option> */}
            {this.displayMonths()}
          </select>
        </form>
        <h3>{month_name}</h3>
        {/* <div className="flex-column report">{this.returnElement()}</div> */}

        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default Budget;
