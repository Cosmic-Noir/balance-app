import React, { Component } from "react";
import config from "../../config";
import PropTypes from "prop-types";

/* Custom Components */
import AddCharge from "../addCharge/addCharge";
import AddIncome from "../addIncome/addIncome";
import Charge from "../charge/charge";
import Demo from "../demo/demo";
import TokenService from "../../auth/token-service";
import ViewSpending from "../viewSpending/viewSpending";

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

  /* Custom Methods */

  // Responsible for taking returned response from server and adding it to current array of charges
  addReturnedCharges = returnedCharge => {
    this.context.addNewCharge(returnedCharge);
    this.setState({ charges: [...this.state.charges, returnedCharge] });
  };

  // Responsible for displaying correct charge line depending on charge category
  displayCharges = () => {
    let currentPaycheck = 0;
    let expenses = 0;

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
            updateNewCharge={this.updateNewCharge}
            setCharges={this.setCharges}
          />
        );
      } else if (category !== "Income") {
        expenses -= amount;

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
            updateNewCharge={this.updateNewCharge}
            setCharges={this.setCharges}
          />
        );
      } else {
        // IF category IS income and it's NOT the first charge
        let remainder = Math.round((currentPaycheck + expenses) * 100) / 100;

        let pastPaycheck = currentPaycheck;

        // Then set the current paycheck to the selected one
        currentPaycheck = amount;

        // Then reset expenses
        expenses = 0;
        return (
          <div className="remainder">
            <p className={remainder < 0 ? "red" : "green"}>
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
              occurance={occurance}
              updateNewCharge={this.updateNewCharge}
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
        <p className={remainder < 0 ? "red" : "green"}>
          Current Income: {pastPaycheck} means {remainder}{" "}
          {remainder < 0 ? "needed to cover expenses" : "leftover from income"}
        </p>
      </div>
    ];
    return allCharges;
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

  // Responsible for POST req for adding new charge to server DB
  postNewCharge = newCharge => {
    const url = config.API_ENDPOINT + "charges";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(newCharge),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            console.log(error.message);
            this.setState({ error: error.message });
            throw error;
          });
        }
        return res.json();
      })
      .then(this.addReturnedCharges);
  };

  // Responsible for going through state of charges and adding each to App layer charges array
  saveAllCharges = () => {
    for (let i = 0; i < this.state.charges.length; i++) {
      setTimeout(() => {
        this.context.addNewCharge(this.state.charges[i]);
      }, 500);
    }
  };

  // Responsible for for aquiring correct month_name and setting matching charges
  setCharges = () => {
    let month_name;
    if (this.props.new === true) {
      month_name = this.state.month_name;
    } else {
      month_name =
        this.props.testingVal || document.getElementById("month_name").value;
    }

    let charges = this.context.charges.filter(charge => {
      if (charge.month_name === month_name) {
        return charge;
      } else {
        return "";
      }
    });

    this.setState({ charges: charges }, function() {
      this.sortCharges();
    });
  };

  // Responsible for calculating first of the month from state to pass to calender as min value
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

  // Responsible for filtering charges for "monthly" occurance and updating due_date to selected month_name
  setImportedCharges = () => {
    // eslint-disable-next-line
    let filteredCharges = this.state.charges.filter(charge => {
      if (charge.occurance === "Monthly") {
        return charge;
      }
    });

    let newCharges = filteredCharges.map(charge => {
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

      return {
        amount: charge.amount,
        category: charge.category,
        charge_name: charge.charge_name,
        charge_id: null,
        due_date: newDueDate,
        occurance: charge.occurance,
        month_name: this.props.month_name
      };
    });

    // SignedIn user vs Demo user
    if (this.context.signedIn === true) {
      this.setState({ charges: [] });

      for (let i = 0; i < newCharges.length; i++) {
        this.postNewCharge(newCharges[i]);
      }
      setTimeout(() => {
        this.sortCharges();
      }, 500);

      // Charges from selected month created, can now update current state to selected month_name from createBudget
      this.setState(
        { month_name: this.props.month_name },
        this.saveAllCharges()
      );
    } else {
      for (let i = 0; i < newCharges.length; i++) {
        newCharges[i].charge_id = Math.floor(Math.random() * 1000);
      }

      this.setState({ charges: newCharges }, function() {
        this.sortCharges();
      });

      this.setState(
        { month_name: this.props.month_name },
        this.saveAllCharges()
      );
    }
  };

  // Responsible for setting month_name in state
  setMonth = month_name => {
    this.setState({ month_name: month_name });
    this.setCharges();
    setTimeout(() => {
      this.setFirstofMonth();
    }, 1000);
  };

  // Responsible for setting month_name when user is importing charges
  setMonthDelay = month_name => {
    this.setState({ month_name: month_name });
    setTimeout(() => {
      this.setCharges();
      this.setImportedCharges();
      this.setFirstofMonth();
    }, 1000);
  };

  // Responsible for showing Add Charge
  showAddCharge = () => {
    let addCharge = document.getElementById("addCharge");
    addCharge.classList.remove("hidden");
    let addButton = document.getElementById("showAdd");
    addButton.classList.add("hidden");
  };

  // Responsible for showing Add Income
  showAddIncome = () => {
    let addIncome = document.getElementById("addIncome");
    addIncome.classList.remove("hidden");
    let addIncomeButton = document.getElementById("showAddIncome");
    addIncomeButton.classList.add("hidden");
  };

  // Responsible for sorting the charges by due_date, if due_date matches and income category detected, income returned first
  sortCharges = () => {
    let charges = this.state.charges;

    charges.sort((a, b) => {
      let aDay = parseInt(a.due_date.substring(8, 10));
      let bDay = parseInt(b.due_date.substring(8, 10));

      if (aDay === bDay && a.category === "Income") {
        return -1;
      } else if (aDay > bDay || aDay === bDay) {
        return 1;
      } else {
        return -1;
      }
    });
    this.setState({ charges: charges });
  };

  // Responsible for updating a charge in current charge state in budget
  updateNewCharge = updatedCharge => {
    this.setState({
      charges: this.state.charges.map(charge =>
        charge.charge_id !== updatedCharge.charge_id ? charge : updatedCharge
      )
    });
  };

  /* Event Handling */

  // Responsible for when user clicks Hide Spending Report
  handleClickHideReport = () => {
    const spendingReport = document.getElementById("spendingRepo");
    spendingReport.classList.add("hidden");
    const viewSpendButton = document.getElementById("spendButton");
    viewSpendButton.classList.remove("hidden");
  };

  // Responsible for when user clicks Show Spending Report
  handleClickShowReport = () => {
    const spendingReport = document.getElementById("spendingRepo");
    spendingReport.classList.remove("hidden");
    const viewSpendButton = document.getElementById("spendButton");
    viewSpendButton.classList.add("hidden");
  };

  // Responsible for hiding edit/delete buttons on each charge
  handleDoneEditingClick = () => {
    this.setState({ editingBudget: false });
  };

  // Responsible for showing edit/delete buttons on each charge
  handleEditBudgetClick = () => {
    this.setState({ editingBudget: true });
  };

  componentDidMount() {
    if (this.props.new === true && this.props.imported !== true) {
      this.setMonth(this.props.month_name);
    } else if (this.props.new === true && this.props.imported === true) {
      this.setMonthDelay(this.props.imported_month_name);
    } else {
      let month_name =
        this.props.testingVal || document.getElementById("month_name").value;
      this.setMonth(month_name);
    }
  }

  render() {
    return (
      <div className="wrapper">
        {this.context.signedIn === true ? "" : <Demo />}
        <div
          className="back_style budgetReport flex-column"
          data-aos="fade-in"
          data-aos-duration="2000"
          id={this.props.new === true ? "newBudget" : ""}
        >
          <h2 className="budgetTitle title">Budget Report</h2>

          <form
            className={this.props.new === true ? "hidden" : ""}
            id="budgetForm"
          >
            <h3 className="budgetTitle">Select Budget:</h3>
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
          <h3 className="budgetTitle title">{this.state.month_name}</h3>
          <div className="flex-column report">{this.displayCharges()}</div>
          <div className="month_totals">
            <h4 className="total">
              Monthly total Income: {this.displayIncome()}{" "}
            </h4>
            <h4 className="total">
              Monthly total Expenses: {this.displayExpenses()}
            </h4>
            <h4 className="total">
              Monthly leftover:{" "}
              {Math.round(
                (this.displayIncome() + this.displayExpenses()) * 100
              ) / 100}
            </h4>
          </div>
          <AddCharge
            first_of_month={this.state.first_of_month}
            month_name={this.state.month_name}
            setCharges={this.setCharges}
          />

          <button
            className="main_button"
            id="showAdd"
            onClick={this.showAddCharge}
            type="button"
          >
            Add Charge
          </button>
          <button
            className="main_button"
            id="showAddIncome"
            onClick={this.showAddIncome}
            type="button"
          >
            Add Income
          </button>
          <AddIncome
            first_of_month={this.state.first_of_month}
            month_name={this.state.month_name}
            setCharges={this.setCharges}
          />

          {this.state.editingBudget === true ? (
            <button
              className="main_button"
              onClick={this.handleDoneEditingClick}
            >
              Done Editing
            </button>
          ) : (
            ""
          )}
          {this.state.editingBudget !== true ? (
            <button
              className="main_button"
              onClick={this.handleEditBudgetClick}
            >
              Edit Budget
            </button>
          ) : (
            ""
          )}
          {this.props.new !== true ? (
            <button
              className="main_button"
              id="spendButton"
              onClick={this.handleClickShowReport}
              type="button"
            >
              View Spending Reports
            </button>
          ) : (
            ""
          )}
        </div>
        {this.props.new !== true ? (
          <div className="hidden" id="spendingRepo">
            <ViewSpending handleClickHideReport={this.handleClickHideReport} />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Budget;

Budget.propTypes = {
  imported: PropTypes.bool,
  imported_month_name: PropTypes.string,
  month_name: PropTypes.string,
  new: PropTypes.bool
};
