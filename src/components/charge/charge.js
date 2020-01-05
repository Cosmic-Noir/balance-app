import React, { Component } from "react";

/* Styling & Images */
import "./charge.css";

/* Context */
import balanceContext from "../../balanceContext";

class Charge extends Component {
  static contextType = balanceContext;

  handleClickDelete = () => {
    // console.log(this.props.charge_id);
    this.context.deleteCharge(this.props.charge_id);
    setTimeout(() => {
      this.props.setCharges();
    }, 1000);
  };

  handleClickEdit = () => {
    let charge = document.getElementById("charge" + this.props.charge_id);
    console.log(charge);
    charge.innerHTML = `<span>{this.props.charge_name} HAS BEEN EDITED</span>`;
    console.log("edit hit");
  };

  render() {
    return (
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
    );
  }
}

export default Charge;
