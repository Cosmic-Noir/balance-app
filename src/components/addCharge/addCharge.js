import React, { Component } from "react";
import config from "../../config";
import PropTypes from "prop-types";

/* Custom Components */
import TokenService from "../../auth/token-service";

/* Styling & Images */
import "./addCharge.css";

/* Context */
import balanceContext from "../../balanceContext";

class AddCharge extends Component {
  state = {
    amount: "",
    category: "Auto",
    charge_name: "",
    due_date: "",
    occurance: "One Time"
  };

  static contextType = balanceContext;

  /* State updating methods */
  updateChargeName(charge_name) {
    this.setState({ charge_name });
  }

  updateOccurance(occurance) {
    this.setState({ occurance: occurance });
  }

  updateAmount(amount) {
    this.setState({ amount: parseFloat(amount) });
  }

  updateCategory(category) {
    this.setState({ category: category });
  }

  updateDueDate(due_date) {
    this.setState({ due_date: due_date });
  }

  /* Custom Methods */

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

  // Will still allow demo user to update demo data without auth Token
  patchCharge = updatedCharge => {
    const url = `${config.API_ENDPOINT}charges/${updatedCharge.charge_id}`;

    fetch(url, {
      method: "PATCH",
      body: JSON.stringify(updatedCharge),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
      })
      .then(this.updateCurrCharge(updatedCharge));
  };

  updateCurrCharge = updatedCharge => {
    this.context.updateCharge(updatedCharge);
    setTimeout(() => {
      this.props.setCharges();
    }, 500);
    this.props.handleClickUpdate();
  };

  addNewCharge = response => {
    this.context.addNewCharge(response);
    setTimeout(() => {
      this.props.setCharges();
    }, 500);
    this.resetCharge();
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.props.editing === true) {
      let updatedCharge = this.state;
      updatedCharge.charge_id = this.props.charge_id;
      updatedCharge.month_name = this.props.month_name;

      if (this.context.signedIn === true) {
        this.patchCharge(updatedCharge);
      } else {
        this.updateCurrCharge(updatedCharge);
      }
    } else {
      // Adding unique new charge
      let newCharge = this.state;

      newCharge.month_name = this.props.month_name;

      if (this.context.signedIn === true) {
        this.postNewCharge(newCharge);
      } else {
        newCharge.charge_id = Math.floor(Math.random() * 1000);
        this.addNewCharge(newCharge);
      }
    }
  };

  // Responsible for changing fields to empty

  resetCharge = () => {
    this.setState({
      charge_name: "",
      category: "Auto",
      due_date: "",
      amount: "",
      occurance: "One Time"
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
    this.props.handleClickUpdate();
    this.setProps();
  };

  handleClickUpdate = () => {
    let updatedCharge = this.state;
    updatedCharge.charge_id = this.props.charge_id;
    updatedCharge.month_name = this.props.month_name;
    this.props.updateNewCharge(updatedCharge);
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
        data-aos="fade-in"
        data-aos-duration="2000"
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
            min={this.props.first_of_month}
            name="due_date"
            ref={this.due_date}
            required
            type="date"
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
            type="number"
            value={this.state.amount}
          />
          <select
            id="category"
            onChange={e => this.updateCategory(e.target.value)}
            placeholder="category"
            name="category"
            ref={this.category}
            value={this.state.category}
            required
          >
            <option value="Auto">Auto</option>
            <option value="Bills/Utilities">Bills/Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food/Drink">Food/Drink</option>
            <option value="Health">Health</option>
            <option value="Housing">Housing</option>
            <option value="Insurance/Financial">Insurance/Financial</option>
            <option value="Other">Other</option>
            <option value="Pets">Pets</option>
            <option value="Savings">Savings</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>

            {this.props.editing === true ? (
              <option value="Income">Income</option>
            ) : (
              ""
            )}
          </select>
          <select
            id="occurance"
            onChange={e => this.updateOccurance(e.target.value)}
            placeholder="occurance"
            name="occurance"
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
          {this.props.editing === true ? (
            <div>
              <button className="main_button" type="submit">
                Update
              </button>
              <button
                className="main_button"
                onClick={this.handleHideEdit}
                type="button"
              >
                Cancel
              </button>
            </div>
          ) : (
            ""
          )}

          {this.props.charge_id ? (
            ""
          ) : (
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
          )}
        </form>
      </div>
    );
  }
}

export default AddCharge;

AddCharge.propTypes = {
  amount: PropTypes.number,
  category: PropTypes.string,
  charge_id: PropTypes.number,
  charge_name: PropTypes.string,
  due_date: PropTypes.string,
  editingBudget: PropTypes.bool,
  handleClickUpdate: PropTypes.func,
  first_of_month: PropTypes.string,
  month_name: PropTypes.string,
  occurance: PropTypes.string,
  setCharges: PropTypes.func,
  updateNewCharge: PropTypes.func
};
