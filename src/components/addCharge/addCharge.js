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
    category: "Auto",
    due_date: "",
    amount: "",
    occurance: "monthly",
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
    this.setState({ amount: parseInt(amount) });
  }

  updateCategory(category) {
    this.setState({ category });
  }

  updateDueDate(due_date) {
    this.setState({ due_date: parseInt(due_date) });
  }

  /* Custom Methods */

  generateId = () => {};

  handleSubmit = e => {
    e.preventDefault();
    let newCharge = this.state;

    newCharge.month_name = this.props.month_name;
    newCharge.user_id = this.context.userInfo.user_id;
    // console.log(newCharge);
    this.props.addNewCharge(newCharge);
    this.props.sortCharges();
    this.resetCharge();
    console.log("Form submitted");
    // console.log(this.props);
  };

  // Responsible for changing fields to empty
  // Not working properly
  resetCharge = () => {
    this.setState({ charge_name: "" });
  };

  // Responsible for when user clicks cancel button
  handleCancel = () => {
    let addCharge = document.getElementById("addCharge");
    addCharge.classList.add("hidden");
    let addButton = document.getElementById("showAdd");
    addButton.classList.remove("hidden");
  };

  componentDidMount() {}

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
            <option value="Auto">Auto</option>
            <option value="Bills/Utilities">Bills/Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food/Drink">Food/Drink</option>
            <option value="Health">Health</option>
            <option value="Housing">Housing</option>
            <option value="Income">Income</option>
            <option value="Insurance/Financial">Insurance/Financial</option>
            <option value="Other">Other</option>
            <option value="Pets">Pets</option>
            <option value="Savings">Savings</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
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
