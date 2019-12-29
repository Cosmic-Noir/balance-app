import React, { Component } from "react";
// import { Link } from "react-router-dom";

/* Context */
import balanceContext from "../../balanceContext";

class viewSpending extends Component {
  state = {};

  static contextType = balanceContext;

  /* Custom Methods */

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="viewSpending">
        <h2>Spending Report:</h2>
        {/* Spending report with pie graph */}
        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default viewSpending;
