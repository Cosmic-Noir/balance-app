import React, { Component } from "react";

/* Styling & Images */
import "./charge.css";

/* Context */
import balanceContext from "../../balanceContext";
import AddCharge from "../addCharge/addCharge";

class Charge extends Component {
  state = {
    charge_name: "",
    category: "Auto",
    due_date: "",
    amount: "",
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

  handleClickDelete = () => {
    // console.log(this.props.charge_id);
    this.context.deleteCharge(this.props.charge_id);
    setTimeout(() => {
      this.props.setCharges();
    }, 1000);
  };

  // Responsible for setting editing to true, thus revealing form with values instead of charge line
  handleClickEdit = () => {
    this.setState({ editing: true });
  };

  // Responsible for changing editing to false, thus revleaing charge line instead of form
  handleClickSave = () => {
    this.setState({ editing: false });
  };

  // Responsible for if user hits cancel, simply hiding form info and revelaing existing line
  handleHideEdit = () => {};

  render() {
    return (
      <div className="flex-column width-80">
        {this.state.editing === true ? (
          <AddCharge
            editing={this.state.editing}
            charge_id={this.props.charge_id}
            charge_name={this.props.charge_name}
          />
        ) : (
          <div className="charge" id={"charge" + this.props.charge_id}>
            <span className="detail">{this.props.due_date}</span>
            <span className="detail">{this.props.charge_name}</span>
            <span className="detail">{this.props.amount}</span>
            <div className="hidden editType">
              <button onClick={this.handleClickEdit}>Edit</button>
              <button onClick={this.handleClickDelete} type="button">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Charge;
