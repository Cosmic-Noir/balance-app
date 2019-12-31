import React, { Component } from "react";
import { Link } from "react-router-dom";

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
          <Link to="budgets" className="block">
            View Budgets
          </Link>
          <Link to="createBudget" className="block">
            Create Budget
          </Link>

          <Link to="viewSavings" className="block">
            View Savings
          </Link>
          <Link to="viewSpending" className="block">
            View Spending
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
