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

  // Responsible for providing options of monthly budgets
  displayMonths = () => {
    const months = {};
    if (this.context.charges === null) {
      return null;
    } else {
      return this.context.charges.map(charge => {
        const { month_name } = charge;

        if (months[month_name] === true) {
          return null;
        }
        months[month_name] = true;

        return (
          <option value={month_name} key={month_name}>
            {month_name}
          </option>
        );
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log("Fetching spending report...");
  };

  componentDidMount() {
    console.log(this.context.month_list);
  }

  render() {
    return (
      <div className="viewSpending">
        <h2>Spending Report:</h2>
        <form
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <select>
            <option value="all">All</option>
            {this.displayMonths()}
          </select>
          <button type="submit">Fetch Spending Report</button>
        </form>

        {/* Spending report with pie graph */}
        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default viewSpending;
