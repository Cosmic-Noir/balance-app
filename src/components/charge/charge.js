import React, { Component } from "react";

export default function Charge() {
  return (
    <div className="charge">
      <tr>
        <td>{this.props.due_date}</td>
        <td>{this.props.charge_name}</td>
        <td>{this.props.amount}</td>
      </tr>
    </div>
  );
}
