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
    month: "",
    report: ""
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
  // Responsible for creating list of user's created month reports
  // createMonthList = () => {
  //   const monthList = {};

  //   return this.context.charges.map(charge => {
  //     const { month_name }
  //     if (monthList[charge.charge_name] === true){
  //       return ull;
  //     }
  //     monthList[charge.charge_name] = true;
  //   })
  // }

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

  returnElement = () => {
    let totalIncome = 0;
    let totalExpenses = 0;
    let currentPaycheck = 0;
    let expenses = 0;

    let arr = this.state.charges;

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
    this.setCharges();
  }

  render() {
    const { month_name } = this.state.report;
    return (
      <div className="budgetReport flex-column">
        <h2 className="title">Budget Report</h2>
        <h3>{month_name}</h3>
        <div className="flex-column report">{this.returnElement()}</div>

        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default Budget;
