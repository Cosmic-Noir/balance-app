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
      <div
        className="back_style flex-column"
        data-aos="fade-in"
        data-aos-duration="2000"
        id="landing"
      >
        <h1 id="logo">Balance</h1>
        <h2>
          Personal Budgeting Made <span>Simple</span>
        </h2>

        <p className="explanation">
          <em>
            Balance is a free, monthly budgeting app that allows users to easily
            calculate their expenses per paycheck and per month. The Spending
            Report feature allows users to track their spending habits by
            category. See our{" "}
            <Link to="/budgets" id="demo">
              Demo
            </Link>{" "}
            to explore the app before signing up.
          </em>
        </p>

        {this.context.signedIn === false ? (
          <Link to="/signUp" className="link">
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
