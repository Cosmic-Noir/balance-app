import React, { Component } from "react";

/* Styling & Images */
import "./charge.css";

/* Context */
import balanceContext from "../../balanceContext";

class Charge extends Component {
  static contextType = balanceContext;

  render() {
    return (
      <div className="charge">
        <span className="detail">{this.props.due_date}</span>
        <span className="detail">{this.props.charge_name}</span>
        <span className="detail">{this.props.amount}</span>
        <div>
          <button className="hidden editType">Delete</button>
          <button className="hidden editType">Edit</button>
        </div>
      </div>
    );
  }
}

export default Charge;
