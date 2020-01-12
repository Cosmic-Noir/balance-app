import React, { Component } from "react";
// import { Link } from "react-router-dom";

/* Custom Components */
import Budget from "../budget/budget";

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

  checkMonthName = month_name => {
    for (let i = 0; i < this.context.charges.length; i++) {
      if (month_name === this.context.charges[i].month_name) {
        this.setState({
          error: `Month name already taken, please select a different month/year`
        });
      } else {
        this.setState({ error: null });
      }
    }
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

  handleSubmit = e => {
    e.preventDefault();
    let newYear = document.getElementById("newYear").value;
    let newMonthName = document.getElementById("newMonthName").value;
    let newBudgetName = newMonthName + " " + newYear;
    // console.log(newBudgetName);

    // Need to check if budget name is already taken
    this.checkMonthName(newBudgetName);
    if (this.state.error === null) {
      this.setState({ month_name: newBudgetName });
      const nameBudget = document.getElementById("selectName");
      nameBudget.classList.add("hidden");
      if (this.state.imported === true) {
        this.hideImportMonth();
      }
    }
  };

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  handleClickYes = () => {
    this.setState({ imported: true, new: true });
    this.hideCreate();
    setTimeout(() => {
      if (this.state.imported === true) {
        let imported_month_name = document.getElementById("imported_month_name")
          .value;
        // console.log(imported_month_name);
        this.setImportedMonth(imported_month_name);
      }
    });
  };

  handleClickNo = () => {
    this.setState({ new: true });
    this.hideCreate();
  };

  hideCreate = () => {
    let option = document.getElementById("createNew");
    option.classList.add("hidden");
  };

  hideImportMonth = () => {
    let importOption = document.getElementById("selectImportMonth");
    importOption.classList.add("hidden");
  };

  componentDidMount() {
    if (this.context.charges[0] === undefined) {
      this.handleClickNo();
      console.log("should be no");
    }
    console.log(this.context.charges);
  }

  render() {
    return (
      <div className="createBudget">
        <h2>Create New Budget:</h2>
        <div id="createNew">
          <h3>Import last month's charges?</h3>
          <h5>Note this will not include one-time categorized charges</h5>
          <button onClick={this.handleClickYes}>Yes, Import Charges</button>
          <button onClick={this.handleClickNo}>No, Start Fresh</button>
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
                type="text"
                id="newYear"
                placeholder="2020"
                required
              ></input>
              <button type="submit">Name Budget</button>
              {this.state.error}
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
            imported_month_name={this.state.imported_month_name}
            month_name={this.state.month_name}
            imported={this.state.imported}
            new={this.state.new}
            history={this.props.history}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default CreateBudget;
