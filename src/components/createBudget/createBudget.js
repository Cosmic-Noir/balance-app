import React, { Component } from "react";
import { Link } from "react-router-dom";

/* Context */
import balanceContext from "../../balanceContext";

class CreateBudget extends Component {
  state = {};

  static contextType = balanceContext;

  render() {
    return (
      <div className="createBudget">
        <h2>Create New Budget:</h2>
        {/* Budget Form here */}
      </div>
    );
  }
}

export default CreateBudget;
