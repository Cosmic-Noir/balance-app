import React, { Component } from "react";
// import { Link } from "react-router-dom";

/* Custom Components */
import Budget from "../budget/budget";

/* Context */
import balanceContext from "../../balanceContext";

class CreateBudget extends Component {
  state = {};

  static contextType = balanceContext;

  /* Custom Methods */

  handleSubmit = e => {
    e.preventDefault();
    let newMonthName = document.getElementById("newMonthName").value;
    console.log(newMonthName);
    this.setState({ month_name: newMonthName });
  };

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  handleClickYes = () => {
    this.setState({ imported: true, new: true });
    this.hideCreate();
  };

  handleClickNo = () => {
    this.setState({ new: true });
    this.hideCreate();
  };

  hideCreate = () => {
    let option = document.getElementById("createNew");
    option.classList.add("hidden");
  };

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
              <input type="text" id="newMonthName"></input>
              <button type="submit">Name Budget</button>
            </form>
          </div>
        ) : (
          ""
        )}
        <br />
        {this.state.month_name ? (
          <Budget
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
