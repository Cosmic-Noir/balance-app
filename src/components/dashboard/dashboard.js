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
        <div className="lGrey grid-container list">
          <div className="block">"View Budgets</div>
          <div className="block">Create Budget</div>

          <div className="block">View Savings</div>
          <div className="block">View Spending</div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
