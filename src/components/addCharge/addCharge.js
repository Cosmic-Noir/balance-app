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
    amount: "",
    category: "Auto",
    charge_id: "",
    charge_name: "",
    due_date: "",
    occurance: "monthly"
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
    this.setState({ amount: parseFloat(amount) });
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

    if (this.props.editing === true) {
      let updatedCharge = this.state;
      updatedCharge.charge_id = this.props.charge_id;
      updatedCharge.month_name = this.props.month_name;
      console.log(this.props);
      console.log(updatedCharge);
      this.context.updateCharge(updatedCharge);
      // setTimeout(() => {
      //   this.props.setCharges();
      // }, 1000);
      this.props.handleClickSave();
    } else {
      let newCharge = this.state;

      newCharge.month_name = this.props.month_name;
      newCharge.user_id = this.context.userInfo.user_id;
      newCharge.charge_id = Math.floor(Math.random() * 1000);
      // console.log(newCharge);
      this.context.addNewCharge(newCharge);
      setTimeout(() => {
        this.props.setCharges();
      }, 1000);
      // this.props.setCharges();
      this.resetCharge();
    }
  };

  // Responsible for changing fields to empty
  // Not working properly
  resetCharge = () => {
    this.setState({
      charge_id: "",
      charge_name: "",
      category: "Auto",
      due_date: "",
      amount: "",
      occurance: "monthly",
      user_id: ""
    });
  };

  // Responsible for when user clicks cancel button
  handleCancel = () => {
    let addCharge = document.getElementById("addCharge");
    addCharge.classList.add("hidden");
    let addButton = document.getElementById("showAdd");
    addButton.classList.remove("hidden");
  };

  // Responsible for setting state IF props were passed
  setProps = () => {
    if (this.props.charge_name) {
      this.updateChargeName(this.props.charge_name);
    }
    if (this.props.due_date) {
      this.updateDueDate(this.props.due_date);
    }
    if (this.props.amount) {
      this.updateAmount(this.props.amount);
    }
    if (this.props.category) {
      this.updateCategory(this.props.category);
    }
    if (this.props.occurance) {
      this.updateOccurance(this.props.occurance);
    }
  };

  // Responsible for if user hits cancel, simply hiding form info and revelaing existing line
  handleHideEdit = () => {
    this.props.handleClickSave();
  };

  componentDidMount() {
    this.setProps();
  }

  render() {
    return (
      <div
        className={
          this.props.editing === true ? "addCharge" : "addCharge hidden"
        }
        id={
          this.props.editing === true
            ? "addCharge" + this.props.charge_id
            : "addCharge"
        }
      >
        <form
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <input
            className="chargeInput"
            id="due_date"
            onChange={e => this.updateDueDate(e.target.value)}
            placeholder="due date"
            name="due_date"
            ref={this.due_date}
            required
            type="text"
            value={this.state.due_date}
          />
          <input
            className="chargeInput"
            id="charge_name"
            onChange={e => this.updateChargeName(e.target.value)}
            placeholder="charge name"
            name="charge_name"
            ref={this.charge_name}
            required
            type="text"
            value={this.state.charge_name}
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
            value={this.state.amount}
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
          {this.props.editing === true ? (
            <div>
              <button type="submit">Update</button>
              <button onClick={this.handleHideEdit} type="button">
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <button type="submit">Add</button>
              <button onClick={this.handleCancel} type="button">
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default AddCharge;
