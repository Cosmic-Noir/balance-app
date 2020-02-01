import React, { Component } from "react";
import { Link } from "react-router-dom";

/* Custom Components */
import TokenService from "../../auth/token-service";

/* Styling and Images: */
import "./nav.css";

/* Context */
import balanceContext from "../../balanceContext";

class Nav extends Component {
  static contextType = balanceContext;

  /* Custom Methods */

  // Responsible for when user clicks Sign Out button
  handleSignOut = () => {
    TokenService.clearAuthToken();
    if (window.innerWidth < 600) {
      this.toggleMobileMenu();
    }
    this.context.onSignOut();
    this.context.checkLoginStatus();
  };

  // Responsible for toggling display of mobile nav menu
  toggleMobileMenu = () => {
    const mobileMenu = document.getElementById("mobileNav");
    if (
      mobileMenu.style.display === "" ||
      mobileMenu.style.display === "none"
    ) {
      mobileMenu.style.display = "block";
    } else {
      mobileMenu.style.display = "none";
    }
  };

  render() {
    return (
      <div
        className="back_style navBar"
        data-aos="fade-in"
        data-aos-duration="2000"
      >
        <Link to="/" className="balance" id="navLogo">
          Balance
        </Link>

        <div className="deskNav">
          <div>
            <Link className="nav" to="/">
              Home
            </Link>
            {this.context.signedIn === true ? (
              <Link className="nav" to="/dashboard">
                Dashboard
              </Link>
            ) : (
              <Link className="nav" to="/dashboard">
                Demo
              </Link>
            )}

            {this.context.signedIn === true ? (
              <Link to="createBudget" className="nav">
                Create New Budget
              </Link>
            ) : (
              ""
            )}
            {this.context.signedIn === true ? (
              <Link to="budgets" className="nav">
                View Budgets
              </Link>
            ) : (
              <Link to="/signIn" className="nav">
                Sign In
              </Link>
            )}

            {this.context.signedIn === false ? (
              <Link className="nav" to="/signUp">
                Sign Up
              </Link>
            ) : (
              <Link className="nav" onClick={this.handleSignOut} to="/signOut">
                Sign Out
              </Link>
            )}
          </div>
        </div>
        <p onClick={this.toggleMobileMenu} className="balanceMobile">
          B
        </p>

        {this.context.signedIn === true ? (
          <div id="mobileNav">
            <Link className="mobile" onClick={this.toggleMobileMenu} to="/">
              Home
            </Link>{" "}
            <Link
              className="mobile"
              onClick={this.toggleMobileMenu}
              to="/dashboard"
            >
              Dashboard
            </Link>
            <Link className="mobile" onClick={this.handleSignOut} to="/signOut">
              Sign Out
            </Link>
          </div>
        ) : (
          <div id="mobileNav">
            {" "}
            <Link className="mobile" onClick={this.toggleMobileMenu} to="/">
              Home
            </Link>
            <Link
              className="mobile"
              onClick={this.toggleMobileMenu}
              to="/dashboard"
            >
              Demo
            </Link>{" "}
            <Link
              className="mobile"
              onClick={this.toggleMobileMenu}
              to="/signIn"
            >
              Sign In
            </Link>{" "}
            <Link
              className="mobile"
              onClick={this.toggleMobileMenu}
              to="/signUp"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Nav;
