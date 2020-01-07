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

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  handleClickYes = () => {
    this.setState({ imported: true, new: true });
  };

  handleClickNo = () => {
    this.setState({ new: true });
  };

  render() {
    return (
      <div className="createBudget">
        <h2>Create New Budget:</h2>
        {/* Budget Form here */}
        <h3>Import last month's charges?</h3>
        <h5>Note this will not include one-time categorized charges</h5>
        <button onClick={this.handleClickYes}>Yes, Import Charges</button>
        <button>No, Start Fresh</button>
        <br />
        {this.state.new === true ? (
          <Budget
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
