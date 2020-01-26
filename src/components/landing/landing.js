import React, { Component } from "react";
import { Link } from "react-router-dom";

/* Context */
import balanceContext from "../../balanceContext";

/* Styling & Images */
import "./landing.css";

class Landing extends Component {
  static contextType = balanceContext;
  render() {
    return (
      <div className="flex-column">
        <h1>Balance</h1>
        <h2>
          Personal budgeting made <span>simplified.</span>
        </h2>

        <p className="explanation">
          Balance is a free, montly budgeting app that allows users to easily
          calculate their expenses per paycheck and per month. The Spending
          Report feature allows users to track their spending habits by
          category. See our <Link to="/dashboard">Demo</Link> to explore the app
          before signing up.
        </p>

        {this.context.signedIn === false ? (
          <Link to="/signUp" id="">
            Sign Up
          </Link>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Landing;
