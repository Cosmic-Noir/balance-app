import React, { Component } from "react";
// import { Link } from "react-router-dom";

/* Context */
import balanceContext from "../../balanceContext";

class viewSpending extends Component {
  state = {
    selected: "all"
  };

  static contextType = balanceContext;

  /* State Setting Methods */

  updateSelected = selected => {
    this.setState({ selected });
  };

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

  // Responsible for creating an object with totals for each detected categories
  setSpending = () => {};

  componentDidMount() {
    console.log(this.context.month_list);
  }

  render() {
    return (
      <div className="viewSpending">
        <h2>Spending Report:</h2>
        {this.context.charges[0] === undefined ? (
          <h3>Please create a new budget to view your spending reports</h3>
        ) : (
          <form
            onSubmit={e => {
              this.handleSubmit(e);
            }}
          >
            <select
              id="select"
              onChange={e => this.updateSelected(e.target.value)}
              name="selected"
              ref={this.selected}
              value={this.state.selected}
            >
              <option value="all">All</option>
              {this.displayMonths()}
            </select>
            <button type="submit">Fetch Spending Report</button>
          </form>
        )}

        {/* Spending report with pie graph */}
        <button onClick={this.handleBack} type="button">
          Back
        </button>
      </div>
    );
  }
}

export default viewSpending;
