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
      <div className="flex-column" data-aos="fade-in" data-aos-duration="2000">
        <h2>Welcome To Your Budget Planner</h2>
        <div className="dashboard">
          {this.context.charges[0] === undefined ? (
            ""
          ) : (
            <Link to="budgets" className="block">
              View Budgets
            </Link>
          )}
          <Link to="createBudget" className="block">
            Create Budget
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
