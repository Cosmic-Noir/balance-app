import React, { Component } from "react";
import { Link } from "react-router-dom";

/* Context */
import balanceContext from "../../balanceContext";

/* Styling & Images */
import "./budgetPreview.css";

class BudgetsPreview extends Component {
  state = {};

  static contextType = balanceContext;

  /* Custom Methods */

  render() {
    return (
      <Link to={`/monthlyReports/${this.props.month_id}`} className="block">
        <h3 className="month_name">{this.props.month_name}</h3>
      </Link>
    );
  }
}

export default BudgetsPreview;
