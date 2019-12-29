import React, { Component } from "react";

/* Context */
import balanceContext from "../../balanceContext";

class Dashboard extends Component {
  static contextType = balanceContext;

  render() {
    return (
      <div className="dashboard flex-column">
        <h2>Welcome {this.context.userInfo.username}</h2>
      </div>
    );
  }
}

export default Dashboard;
