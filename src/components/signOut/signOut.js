import React, { Component } from "react";
import { Link } from "react-router-dom";

/* Styling & Images */
import "./signOut.css";

/* Context */
import balanceContext from "../../balanceContext";

// Should turn into function when can test
class SignOut extends Component {
  static contextType = balanceContext;

  render() {
    return (
      <div
        className="back_style flex-column"
        data-aos="fade-in"
        data-aos-duration="2000"
        id="signOut"
      >
        <h2 className="title">You have signed out!</h2>
        <Link className="link" to="/signIn">
          Sign In
        </Link>
      </div>
    );
  }
}

export default SignOut;
