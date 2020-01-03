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
  setMonth = month_name => {
    this.setState({ month_name: month_name });
    this.setCharges();
  };

  updateMonth = month_name => {
    this.setState({ month_name: month_name });
    this.setCharges();
  };

  // Responsible for sortilng charges in context and updating state to match selected month_name
  setCharges = () => {
    let month_name = document.getElementById("month_name").value;

    let charges = this.context.charges.filter(charge => {
      if (charge.month_name === month_name) {
        // console.log("matching charge found");
        return charge;
      } else {
        return "";
      }
    });
    this.setState({ charges: charges });

    console.log(`setCharges has run and setState`);
    this.displayIncome();
  };

  /* Custom Methods */

  // Responsible for displaying total monthly income
  displayIncome = () => {
    let totalIncome = 0;
    let charges = this.state.charges;
    for (let i = 0; i < charges.length; i++) {
      if (charges[i].category === "Income") {
        totalIncome += charges[i].amount;
      }
    }

    console.log("displayIncome ran");

    return totalIncome;
  };

  // Responsible for displaying total monthly expenses
  displayExpenses = () => {
    let totalExpenses = 0;
    let charges = this.state.charges;
    for (let i = 0; i < charges.length; i++) {
      if (charges[i].category !== "Income") {
        totalExpenses -= charges[i].amount;
      }
    }

    console.log("displayIncome ran");

    return totalExpenses;
  };

  displayTotalRemainder = () => {
    let income = document.getElementById("");
  };

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

  // Responsible for displaying correct charge line depending on charge category
  displayCharges2 = () => {
    let currentPaycheck = 0;
    let expenses = 0;

    // let arr = this.state.charges;

    let allCharges = this.state.charges.map(charge => {
      const { charge_id, charge_name, due_date, amount } = charge;
      if (charge.category === "Income" && charge === this.state.charges[0]) {
        currentPaycheck = amount;
        return (
          <Charge
            amount={amount}
            due_date={due_date}
            charge_name={charge_name}
            key={charge_id}
          />
        );
      } else if (charge.category !== "Income") {
        expenses -= amount;

        return (
          <Charge
            amount={amount}
            due_date={due_date}
            charge_name={charge_name}
            key={charge_id}
          />
        );
      } else {
        // Then it should be category "Income"
        // if income, calculate previous paychecks remainder
        let remainder = currentPaycheck + expenses;
        let pastPaycheck = currentPaycheck;
        // console.log(
        //   `Current paycheck: ${currentPaycheck} means ${remainder} left over from paycheck`
        // );

        // Then set the current paycheck to the selected one
        currentPaycheck = amount;

        // Then reset expenses
        expenses = 0;
        return (
          <div className="remainder">
            <p>
              Current Paycheck: {pastPaycheck} means {remainder} left over from
              paycheck{" "}
            </p>
            <Charge
              amount={amount}
              class_name="paycheck"
              due_date={due_date}
              charge_name={charge_name}
              key={charge_id}
            />
          </div>
        );
      }
    });

    let remainder = currentPaycheck + expenses;
    let pastPaycheck = currentPaycheck;

    allCharges = [
      ...allCharges,
      <div className="remainder">
        <p>
          Current Paycheck: {pastPaycheck} means {remainder} left over from
          paycheck{" "}
        </p>
      </div>
    ];
    this.displayIncome();
    return allCharges;
  };

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    let month_name = document.getElementById("month_name").value;
    this.setMonth(month_name);
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
            {this.displayMonths()}
          </select>
        </form>
        <h3 className="title">{this.state.month_name}</h3>
        <div className="flex-column report">{this.displayCharges2()}</div>
        <div className="month_totals">
          <h4>Monthly total Income: {this.displayIncome()} </h4>
          <h4>Monthly total Expenses: {this.displayExpenses()}</h4>
          <h4>
            Monthly leftover: {this.displayIncome() + this.displayExpenses()}
          </h4>
        </div>

        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default Budget;
