import React, { Component } from "react";

/* Context */
import balanceContext from "../../balanceContext";

// Should turn into function when can test
class SignOut extends Component {
  static contextType = balanceContext;

  render() {
    return (
      <div className="flex-column">
        <h2 className="title">You have signed out!</h2>
      </div>
    );
  }
}

export default SignOut;
