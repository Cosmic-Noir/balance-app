import React, { Component } from "react";
import { Link } from "react-router-dom";

/* Context */
import balanceContext from "../../balanceContext";

// Should turn into function when can test
class SignOut extends Component {
  static contextType = balanceContext;

  render() {
    return (
      <div className="flex-column" data-aos="fade-in" data-aos-duration="2000">
        <h2 className="title">You have signed out!</h2>
        <Link to="/signIn">Sign In</Link>
      </div>
    );
  }
}

export default SignOut;
