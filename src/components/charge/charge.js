import React, { Component } from "react";

class Charge extends Component {
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
