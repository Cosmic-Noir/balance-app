import React, { Component } from "react";

/* Context */
import balanceContext from "../../balanceContext";

/* Styling & Images */
import "./dashboard.css";

class Dashboard extends Component {
  static contextType = balanceContext;

  render() {
    return (
      <div className="dashboard flex-column">
        <h2>Welcome {this.context.userInfo.username}</h2>
        <div class="lGrey grid-container list">
          <div class="block">"View Budgets</div>
          <div class="block">Create Budget</div>

          <div class="block">View Savings</div>
          <div class="block">View Spending</div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
