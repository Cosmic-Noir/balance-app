import React, { Component } from "react";
// import config from "../../config";

/* Custom Components */
// import TokenService from "../../auth/token-service";

/* Styling & Images */
import "./addCharge.css";

/* Context */
import balanceContext from "../../balanceContext";

class AddCharge extends Component {
  state = {
    // Will randomly create charge_id for now
    charge_id: "",
    charge_name: "",
    category: "",
    due_date: "",
    amount: "",
    month_name: "",
    occurance: "",
    user_id: ""
  };

  static contextType = balanceContext;

  /* State updating methods */
  updateChargeName(charge_name) {
    this.setState({ charge_name });
  }

  updateOccurance(occurance) {
    this.setState({ occurance });
  }

  updateAmount(amount) {
    this.setState({ amount });
  }

  updateCategory(category) {
    this.setState({ category });
  }

  updateDueDate(due_date) {
    this.setState({ due_date });
  }

  /* Custom Methods */

  generateId = () => {};

  handleSubmit = e => {
    e.preventDefault();

    console.log("Form submitted");
  };

  // Responsible for when user clicks cancel button
  handleCancel = () => {
    let addCharge = document.getElementById("addCharge");
    addCharge.classList.add("hidden");
    let addButton = document.getElementById("showAdd");
    addButton.classList.remove("hidden");
  };

  render() {
    return (
      <div className="addCharge hidden" id="addCharge">
        <form
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <input
            className="chargeInput"
            id="charge_name"
            onChange={e => this.updateChargeName(e.target.value)}
            placeholder="charge name"
            name="charge_name"
            ref={this.charge_name}
            required
            type="text"
          />
          <input
            className="chargeInput"
            id="due_date"
            onChange={e => this.updateDueDate(e.target.value)}
            placeholder="due date"
            name="due_date"
            ref={this.due_date}
            required
            type="text"
          />
          <input
            className="chargeInput"
            id="amount"
            onChange={e => this.updateAmount(e.target.value)}
            placeholder="Amount"
            name="amount"
            ref={this.amount}
            required
            type="text"
          />
          <select
            id="category"
            onChange={e => this.updateCategory(e.target.value)}
            placeholder="category"
            name="category"
            ref={this.category}
            required
          >
            <option value="Income">Auto</option>
            <option value="Income">Bills/Utilities</option>
            <option value="Income">Entertainment</option>
            <option value="Income">Food/Drink</option>
            <option value="Income">Health</option>
            <option value="Income">Housing</option>
            <option value="Income">Income</option>
            <option value="Income">Insurance/Financial</option>
            <option value="Income">Other</option>
            <option value="Income">Pets</option>
            <option value="Income">Savings</option>
            <option value="Income">Shopping</option>
            <option value="Income">Travel</option>
          </select>
          <select
            id="occurance"
            onChange={e => this.updateOccurance(e.target.value)}
            placeholder="occurance"
            name="occurance"
            ref={this.occurance}
            required
          >
            <option value="Income">Monthly</option>
            <option value="Income">Weekly</option>
            <option value="Income">Biweekly</option>
          </select>
          {this.state.error !== null ? (
            <h5 className="error">{this.state.error}</h5>
          ) : (
            ""
          )}
          <button type="submit">Add</button>
          <button onClick={this.handleCancel} type="button">
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default AddCharge;
