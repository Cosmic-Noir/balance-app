import React, { Component } from "react";

/* Styling & Images */
import "./charge.css";

/* Context */
import balanceContext from "../../balanceContext";

class Charge extends Component {
  static contextType = balanceContext;

  render() {
    return (
      <ul className="charge">
        <li className="detail">{this.props.due_date}</li>
        <li className="detail">{this.props.charge_name}</li>
        <li className="detail">{this.props.amount}</li>
      </ul>
    );
  }
}

export default Charge;
