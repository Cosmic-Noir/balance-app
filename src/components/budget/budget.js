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
  setMonth = month_name => {
    this.setState({ month_name: month_name });
    this.setCharges();
    setTimeout(() => {
      this.setFirstofMonth();
    }, 1000);
  };

  setMonthDelay = month_name => {
    this.setState({ month_name: month_name });
    setTimeout(() => {
      this.setCharges();
      this.setImportedCharges();
      this.setFirstofMonth();
    }, 1000);
  };

  setFirstofMonth = () => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let digit;
    let year = this.state.month_name.substring(4, 9);

    for (let i = 0; i < months.length; i++) {
      if (months[i] === this.state.month_name.substring(0, 3)) {
        digit = i + 1;
      }
    }
    let stringDig = digit.toString();
    if (stringDig.length === 1) {
      stringDig = "0" + stringDig;
    }

    let fullFirst = year + "-" + stringDig + "-01";
    this.setState({ first_of_month: fullFirst });
  };

  // Responsible for sorting charges in context and updating state to match selected month_name
  setCharges = () => {
    let month_name;
    // console.log(this.state.month_name);
    if (this.props.new === true) {
      month_name = this.state.month_name;
    } else {
      month_name = document.getElementById("month_name").value;
    }

    let charges = this.context.charges.filter(charge => {
      if (charge.month_name === month_name) {
        // console.log("matching charge found");
        return charge;
      } else {
        return "";
      }
    });

    console.log(`setCharges has run and setState`);

    this.setState({ charges: charges }, function() {
      this.sortCharges();
    });
  };

  setImportedCharges = () => {
    let oldCharges = this.state.charges;
    let newCharges = oldCharges.filter(charge => {
      if (charge.occurance === "Monthly") {
        return charge;
      }
    });

    if (this.props.new === true) {
      console.log("filtering charges for monthly");
      newCharges = newCharges.map(charge => {
        if (charge.occurance === "Monthly") {
          // Must update charge month value
          let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ];
          let digit;
          let year = this.props.month_name.substring(4, 9);
          let day = charge.due_date.substring(7, 10);

          for (let i = 0; i < months.length; i++) {
            if (months[i] === this.props.month_name.substring(0, 3)) {
              digit = i + 1;
            }
          }

          let stringDig = digit.toString();
          if (stringDig.length === 1) {
            stringDig = "0" + stringDig;
          }

          let newDueDate = year + "-" + stringDig + day;

          charge.due_date = newDueDate;
          charge.charge_id = Math.floor(Math.random() * 1000);
          return charge;
        }
      });
    }
    // console.log("New budget detected, chaning month_name");
    this.setState({ charges: newCharges }, function() {
      this.sortCharges();
    });
    this.setState({ month_name: this.props.month_name });
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
            new={this.props.new}
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
            new={this.props.new}
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
              Current Income: {pastPaycheck} means {remainder}{" "}
              {remainder < 0
                ? "needed to cover expenses"
                : "leftover from income"}
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
              new={this.props.new}
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
      <div className="remainder" key="rem">
        <p>
          Current Income: {pastPaycheck} means {remainder}{" "}
          {remainder < 0 ? "needed to cover expenses" : "leftover from income"}
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
    this.setState({ editingBudget: true });
  };

  componentDidMount() {
    if (this.props.new === true && this.props.imported !== true) {
      this.setMonth(this.props.month_name);
    } else if (this.props.new === true && this.props.imported === true) {
      let month_name = document.getElementById("month_name").value;
      this.updateRecurrantCharges();
      this.setMonthDelay(month_name);
    } else {
      let month_name = document.getElementById("month_name").value;
      this.setMonth(month_name);
    }
  }

  render() {
    // const { month_name } = this.state.month_name;
    return (
      <div className="budgetReport flex-column">
        <h2 className="title">Budget Report</h2>

        <form
          className={this.props.new === true ? "hidden siteList" : "siteList"}
        >
          <h3>Select Budget:</h3>
          <select
            id="month_name"
            name="month_name"
            onChange={e => this.setMonth(e.target.value)}
            ref={this.state.month_name}
            value={this.state.month_name}
          >
            {this.displayMonths()}
          </select>
        </form>
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
          first_of_month={this.state.first_of_month}
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
        {this.props.new === true ? (
          ""
        ) : (
          <Link to="createBudget">Create Budget</Link>
        )}

        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default Budget;
