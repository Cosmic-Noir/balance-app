import React, { Component } from "react";

/* Styling & Images */
import "./charge.css";

/* Context */
import balanceContext from "../../balanceContext";

class Charge extends Component {
  static contextType = balanceContext;

  render() {
    return (
      <tr className="charge">
        <td>{this.props.due_date}</td>
        <td>{this.props.charge_name}</td>
        <td>{this.props.amount}</td>
      </tr>
    );
  }
}

export default Charge;
