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
        <header>
          <h1>Balance</h1>
          <h2>
            Personal budgeting made <span>simplified.</span>
          </h2>

          {/* <a href="https://www.freepik.com/free-photos-vectors/background">
          Background vector created by s.salvador - www.freepik.com
        </a> */}
        </header>
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
