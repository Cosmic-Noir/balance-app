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

  // Responsible for displaying all savings pools
  displaySavingPools = () => {
    document.getElementById("uniqueSavings").innerHTML = "";
    for (let savingsPool in this.state.savings) {
      document.getElementById(
        "uniqueSavings"
      ).innerHTML += `<h4 class="sav">${savingsPool}: ${this.state.savings[savingsPool]}</h4>`;
    }
  };

  // Responsible for checking charges for unique saving pools and storing their monthly contributions - NOTE would not work if someone is doing two savings pools with the same name in the same month
  setSavings = () => {
    let savings = {};
    let savingCharges = this.context.charges.filter(charge => {
      if (charge.category === "Savings") {
        return charge;
      }
    });

    for (let i = 0; i < savingCharges.length; i++) {
      if (!savings[savingCharges[i].charge_name]) {
        savings[savingCharges[i].charge_name] = savingCharges[i].amount;
      }
    }

    console.log(savings);
    this.setState({ savings: savings });
    setTimeout(() => {
      this.displaySavingPools();
    });
  };

  // Responsible for when user clicks cancel button
  handleBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    this.setSavings();
  }

  render() {
    return (
      <div className="viewSavings">
        <h2>Savings Report:</h2>
        <div id="uniqueSavings"></div>
        {/* Savings report with graph */}
        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default ViewSavings;
