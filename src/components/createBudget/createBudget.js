import React, { Component } from "react";

/* Custom Components */
import Budget from "../budget/budget";

/* Styling & Images */
import "./createBudget.css";

/* Context */
import balanceContext from "../../balanceContext";

class CreateBudget extends Component {
  state = {};

  static contextType = balanceContext;

  /* State Setting Methods */

  setImportedMonth = month_name => {
    this.setState({ imported_month_name: month_name });
  };

  /* Custom Methods */

  // Responssible for checking if month_name already taken
  checkMonthName = month_name => {
    for (let i = 0; i < this.context.charges.length; i++) {
      if (month_name === this.context.charges[i].month_name) {
        return this.setState({
          error: `Month name already taken, please select a different month/year`
        });
      } else {
        this.setState({ error: null });
      }
    }
  };

  // Responsible for providing options of monthly budgets to import charges from
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

  // Responsible for hiding import question once option selected
  hideCreate = () => {
    let option = document.getElementById("createNew");
    option.classList.add("hidden");
  };

  // Responsible for hiding budget selection once option selected
  hideImportMonth = () => {
    let importOption = document.getElementById("selectImportMonth");
    importOption.classList.add("hidden");
  };

  showCreateNew = () => {
    let createNewButton = document.getElementById("createNewButton");
    createNewButton.classList.remove("hidden");
  };

  /* Event Handling */

  // Responsible for when user clicks Create New button on newly created budget
  handleClickNewCreate = () => {
    let option = document.getElementById("createNew");
    option.classList.remove("hidden");
    this.setState({ new: false, imported: false, month_name: null });
    let createNewButton = document.getElementById("createNewButton");
    createNewButton.classList.add("hidden");
  };

  // Responsible for setting new state to true with non-imported status
  handleClickNo = () => {
    this.setState({ new: true });
    if (this.props.testing !== "true") {
      this.hideCreate();
    }
  };

  // Responsible for setting imported and new state to true
  handleClickYes = () => {
    this.setState({ imported: true, new: true });
    if (this.props.testing !== "true") {
      this.hideCreate();
    }
    setTimeout(() => {
      if (this.state.imported === true) {
        let imported_month_name = document.getElementById("imported_month_name")
          .value;
        this.setImportedMonth(imported_month_name);
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    let newYear = document.getElementById("newYear").value;
    let newMonthName = document.getElementById("newMonthName").value;
    let newBudgetName = newMonthName + " " + newYear;

    if (newYear.length !== 4) {
      this.setState({ error: `Please choose valid 4-digit year` });
    } else {
      this.checkMonthName(newBudgetName);

      if (this.state.error === null || this.context.charges[0] === undefined) {
        this.setState({ month_name: newBudgetName });

        const nameBudget = document.getElementById("selectName");

        nameBudget.classList.add("hidden");

        if (this.state.imported === true) {
          this.hideImportMonth();
        }
        this.showCreateNew();
      }
    }
  };

  componentDidMount() {
    if (this.context.charges[0] === undefined) {
      this.handleClickNo();
    }
  }

  render() {
    return (
      <div
        className="back_style createBudget"
        data-aos="fade-in"
        data-aos-duration="2000"
      >
        <h2>Create New Budget:</h2>
        <div id="createNew">
          <h3>Import last month's charges?</h3>
          <h5>Note this will not include one-time categorized charges</h5>
          <button className="main_button" onClick={this.handleClickYes}>
            Yes, Import Charges
          </button>
          <button className="main_button" onClick={this.handleClickNo}>
            No, Start Fresh
          </button>
        </div>
        {this.state.new === true ? (
          <div id="selectName">
            <form
              onSubmit={e => {
                this.handleSubmit(e);
              }}
            >
              <label>Name Budget in month year format:</label>
              <select id="newMonthName">
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
                <option value="Apr">Apr</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
                <option value="Jun">Jun</option>
                <option value="Jul">Jul</option>
                <option value="Aug">Aug</option>
                <option value="Sep">Sep</option>
                <option value="Oct">Oct</option>
                <option value="Nov">Nov</option>
                <option value="Dec">Dec</option>
              </select>
              <input
                id="newYear"
                placeholder="year"
                required
                type="number"
              ></input>
              <button className="main_button" type="submit">
                Create Budget
              </button>
              <h5 className="error">{this.state.error}</h5>
            </form>
          </div>
        ) : (
          ""
        )}
        {this.state.imported === true ? (
          <form className="siteList" id="selectImportMonth">
            <h3>Select Budget to Import From:</h3>
            <select
              id="imported_month_name"
              name="imported_month_name"
              onChange={e => this.setImportedMonth(e.target.value)}
              ref={this.state.imported_month_name}
              value={this.state.imported_month_name}
            >
              {this.displayMonths()}
            </select>
          </form>
        ) : (
          ""
        )}
        <br />
        {this.state.month_name ? (
          <Budget
            history={this.props.history}
            imported_month_name={this.state.imported_month_name}
            imported={this.state.imported}
            month_name={this.state.month_name}
            new={this.state.new}
          />
        ) : (
          ""
        )}
        <button
          className="hidden main_button"
          id="createNewButton"
          onClick={this.handleClickNewCreate}
        >
          Create New Budget
        </button>
      </div>
    );
  }
}

export default CreateBudget;
