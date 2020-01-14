import React, { Component } from "react";
// import { Link } from "react-router-dom";

/* Context */
import balanceContext from "../../balanceContext";

class ViewSavings extends Component {
  state = {
    savings: {}
  };

  static contextType = balanceContext;

  /* Custom Methods */

  checkSavings = () => {
    let savings = {};
    let savingCharges = this.context.charges.filter(charge => {
      if (charge.category === "Savings") {
        return charge;
      }
    });

    for (let i = 0; i < savingCharges.length; i++) {
      if (!savings[savingCharges[i].charge_name]) {
        savings[savingCharges[i].charge_name] = savingCharges[i].amount;
      } else {
        savings[savingCharges[i].charge_name] += savingCharges[i].amount;
      }
    }

    console.log(savings);
  };

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    this.checkSavings();
  }

  render() {
    return (
      <div className="viewSavings">
        <h2>Savings Report:</h2>
        {/* Savings report with graph */}
        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default ViewSavings;
