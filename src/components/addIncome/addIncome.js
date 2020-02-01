import React, { Component } from "react";
import config from "../../config";
import PropTypes from "prop-types";

/* Custom Components */
import TokenService from "../../auth/token-service";

/* Styling & Images */
import "../addCharge/addCharge.css";

/* Context */
import balanceContext from "../../balanceContext";

class AddIncome extends Component {
  state = {
    amount: "",
    category: "Income",
    charge_name: "",
    due_date: "",
    occurance: "One Time"
  };

  static contextType = balanceContext;

  /* State updating methods */
  updateAmount(amount) {
    this.setState({ amount: parseFloat(amount) });
  }

  updateChargeName(charge_name) {
    this.setState({ charge_name });
  }

  updateDueDate(due_date) {
    this.setState({ due_date: due_date });
  }

  updateOccurance(occurance) {
    this.setState({ occurance: occurance });
  }

  /* Custom Methods */

  // Responsible for adding new charge locally
  addNewCharge = response => {
    this.context.addNewCharge(response);
    setTimeout(() => {
      this.props.setCharges();
    }, 500);
    this.resetCharge();
  };

  // Responsible for POST req for adding new charge to server DB
  postNewCharge = newCharge => {
    const url = config.API_ENDPOINT + "charges";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(newCharge),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            console.log(error.message);
            this.setState({ error: error.message });
            throw error;
          });
        }
        return res.json();
      })
      .then(this.addNewCharge);
  };

  // Responsible for resting state
  resetCharge = () => {
    this.setState({
      charge_name: "",
      due_date: "",
      amount: "",
      occurance: "One Time"
    });
  };

  /* Event Handling */

  // Responsible for when user clicks cancel button
  handleCancel = () => {
    let addCharge = document.getElementById("addIncome");
    addCharge.classList.add("hidden");
    let addButton = document.getElementById("showAddIncome");
    addButton.classList.remove("hidden");
  };

  handleSubmit = e => {
    e.preventDefault();
    let newCharge = this.state;
    newCharge.month_name = this.props.month_name;
    if (this.context.signedIn === true) {
      this.postNewCharge(newCharge);
    } else {
      newCharge.charge_id = Math.floor(Math.random() * 1000);
      this.addNewCharge(newCharge);
    }
  };

  render() {
    return (
      <div
        className="hidden"
        data-aos="fade-in"
        data-aos-duration="2000"
        id="addIncome"
      >
        <form
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <input
            className="chargeInput"
            id="income_due_date"
            min={this.props.first_of_month}
            name="due_date"
            onChange={e => this.updateDueDate(e.target.value)}
            ref={this.due_date}
            required
            type="date"
            value={this.state.due_date}
          />
          <input
            className="chargeInput"
            id="income_charge_name"
            name="charge_name"
            onChange={e => this.updateChargeName(e.target.value)}
            placeholder="Income name"
            ref={this.charge_name}
            required
            type="text"
            value={this.state.charge_name}
          />

          <input
            className="chargeInput"
            id="income_amount"
            name="amount"
            onChange={e => this.updateAmount(e.target.value)}
            placeholder="Amount"
            ref={this.amount}
            required
            type="number"
            value={this.state.amount}
          />
          <select
            id="income_occurance"
            name="occurance"
            onChange={e => this.updateOccurance(e.target.value)}
            placeholder="occurance"
            ref={this.occurance}
            required
            value={this.state.occurance}
          >
            <option value="One Time">One Time</option>
            <option value="Monthly">Monthly</option>
          </select>
          {this.state.error !== null ? (
            <h5 className="error">{this.state.error}</h5>
          ) : (
            ""
          )}

          <div>
            <button className="main_button" type="submit">
              Add
            </button>
            <button
              className="main_button"
              onClick={this.handleCancel}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddIncome;

AddIncome.propTypes = {
  first_of_month: PropTypes.string,
  month_name: PropTypes.string,
  setCharges: PropTypes.func
};
