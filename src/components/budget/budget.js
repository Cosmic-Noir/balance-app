import React, { Component } from "react";
import { Link } from "react-router-dom";

/* Custom Components */
import Charge from "../charge/charge";
import AddCharge from "../addCharge/addCharge";

/* Styling & Images */
import "./budget.css";

/* Context */
import balanceContext from "../../balanceContext";

class Budget extends Component {
  state = {
    charges: [],
    editingTable: false,
    month_name: ""
  };

  static contextType = balanceContext;

  /* State Setting Methods */

  updateMonth = month_name => {
    this.setState({ month_name: month_name });
  };

  // Responsible for sorting charges in context and updating state to match selected month_name
  setCharges = () => {
    // console.log(this.context.charges);
    this.setState({ charges: this.context.charges }, function() {
      this.sortCharges();
    });
    // console.log(`setCharges has run and setState`);
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
    return Math.round(totalIncome * 100) / 100;
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
    return Math.round(totalExpenses * 100) / 100;
  };

  // Responsible for providing options of monthly budgets
  displayMonths = () => {
    const months = {};
    if (this.context.charges === null) {
      return null;
    } else {
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
    }
  };

  // Responsible for displaying correct charge line depending on charge category
  displayCharges = () => {
    let currentPaycheck = 0;
    let expenses = 0;

    // let arr = this.state.charges;

    let allCharges = this.state.charges.map(charge => {
      const {
        charge_id,
        charge_name,
        due_date,
        amount,
        category,
        occurance
      } = charge;

      if (category === "Income" && charge === this.state.charges[0]) {
        // console.log(`${charge_name} is income for ${amount}`);
        currentPaycheck = amount;
        return (
          <Charge
            amount={amount}
            category={category}
            charge_id={charge_id}
            charge_name={charge_name}
            due_date={due_date}
            editingBudget={this.state.editingBudget}
            key={charge_id}
            month_name={this.state.month_name}
            occurance={occurance}
            setCharges={this.setCharges}
          />
        );
      } else if (category !== "Income") {
        expenses -= amount;
        // console.log(
        //   `${charge_name} is an expense for $${amount}, current expenses are ${expenses}`
        // );
        return (
          <Charge
            amount={amount}
            category={category}
            charge_id={charge_id}
            charge_name={charge_name}
            due_date={due_date}
            editingBudget={this.state.editingBudget}
            key={charge_id}
            month_name={this.state.month_name}
            occurance={occurance}
            setCharges={this.setCharges}
          />
        );
      } else {
        // IF category IS income and it's NOT the first charge
        let remainder = Math.round((currentPaycheck + expenses) * 100) / 100;
        // console.log(
        //   `Paycheck detected, currentPaycheck is ${currentPaycheck} and expenses are ${expenses} so the remainder is ${currentPaycheck +
        //     expenses}`
        // );
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
              Current Paycheck: {pastPaycheck} means {remainder}{" "}
              {remainder < 0
                ? "needed to cover expenses"
                : "leftover from paycheck"}
            </p>
            <Charge
              amount={amount}
              category={category}
              charge_id={charge_id}
              charge_name={charge_name}
              due_date={due_date}
              editingBudget={this.state.editingBudget}
              key={charge_id}
              month_name={this.state.month_name}
              occurance={occurance}
              setCharges={this.setCharges}
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
          Current Paycheck: {pastPaycheck} means {remainder}{" "}
          {remainder < 0
            ? "needed to cover expenses"
            : "leftover from paycheck"}
        </p>
      </div>
    ];
    return allCharges;
  };

  // Responsible for when user clicks cancel button
  handleBack = () => {
    if (this.props.new === true) {
      this.props.history.push("/dashboard");
    } else {
      this.props.history.goBack();
    }
  };

  // Responsible for showing edit/delete buttons on each charge
  handleEditBudgetClick = () => {
    this.setState({ editingBudget: true });
  };

  // Responsible for hiding edit/delet buttons on each charge
  handleDoneEditingClick = () => {
    this.setState({ editingBudget: false });
  };

  // Responsible for showing Add Charge
  showAddCharge = () => {
    let addCharge = document.getElementById("addCharge");
    addCharge.classList.remove("hidden");
    let addButton = document.getElementById("showAdd");
    addButton.classList.add("hidden");
  };

  // Responsible for sorting the charges by due date
  sortCharges = () => {
    let charges = this.state.charges;
    // console.log(this.state.charges);

    charges.sort((a, b) => {
      let aDay = parseInt(a.due_date.substring(8, 10));
      let bDay = parseInt(b.due_date.substring(8, 10));

      if (aDay === bDay && a.category === "Income") {
        // console.log(`Due date matches, ${a.charge_name} is of income `);
        return -1;
      } else if (aDay > bDay || aDay === bDay) {
        return 1;
      } else {
        return -1;
      }
    });
    this.setState({ charges: charges });
  };

  // Responsible for if state is set to new, turn editingTable to true, filter charges for occurance !== One Time, then update the month_name of the charge, then for each charge, add to all charges
  updateRecurrantCharges = () => {
    this.setState({ editingTable: true });
  };

  // Responsible for updating the month_name value if this.props.new === true
  updateNewMonth = () => {
    const months = {};
    let monthList = this.context.charges.map(charge => {
      const { month_name } = charge;

      if (months[month_name] === true) {
        return null;
      } else {
        months[month_name] = true;
      }
    });

    let names = Object.keys(months);

    for (let i = 0; i < names.length; i++) {
      let last = names[i];
      let year = names[i + 1].substring(4, 8);
    }
    console.log(`New table month required, setting...`);
    console.log(names);
  };

  componentDidMount() {
    this.context.setCharges();
  }

  handleTimeOut = () => {
    setTimeout(() => {
      this.displayCharges();
    }, 2000);
  };

  render() {
    // const { month_name } = this.state.month_name;
    return (
      <div className="budgetReport flex-column">
        <h2 className="title">Budget Report</h2>
        {this.props.new === true ? (
          ""
        ) : (
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
            <button type="submit">Fetch Report</button>
          </form>
        )}
        <h3 className="title">{this.state.month_name}</h3>
        <div className="flex-column report">{this.displayCharges()}</div>
        <div className="month_totals">
          <h4>Monthly total Income: {this.displayIncome()} </h4>
          <h4>Monthly total Expenses: {this.displayExpenses()}</h4>
          <h4>
            Monthly leftover:{" "}
            {Math.round((this.displayIncome() + this.displayExpenses()) * 100) /
              100}
          </h4>
        </div>
        <AddCharge
          month_name={this.state.month_name}
          setCharges={this.setCharges}
        />
        <button onClick={this.showAddCharge} type="button" id="showAdd">
          Add Charge
        </button>
        {this.state.editingBudget === true ? (
          <button onClick={this.handleDoneEditingClick}>Done Editing</button>
        ) : (
          <button onClick={this.handleEditBudgetClick}>Edit Budget</button>
        )}
        <Link to="createBudget">Create Budget</Link>

        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default Budget;
