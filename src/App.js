import React, { Component } from "react";
import { Route } from "react-router-dom";
// import { Link } from "react-router-dom";
import config from "./config";

/* Custom Components */
import Budget from "./components/budget/budget";
import CreateBudget from "./components/createBudget/createBudget";
import ViewSavings from "./components/viewSavings/viewSavings";
import ViewSpending from "./components/viewSpending/viewSpending";

import Dashboard from "./components/dashboard/dashboard";
import Landing from "./components/landing/landing";
import Nav from "./components/nav/nav";
import SignIn from "./components/signIn/signIn";
import SignOut from "./components/signOut/signOut";
import SignUp from "./components/signUp/signUp";

/* Styling & Images */
import "./App.css";

/* Context */
import balanceContext from "./balanceContext";

// Seed Data
import Data from "./data.js";

class App extends Component {
  state = {
    signedIn: "",
    // Initially set to seed data
    charges: [],
    users: Data.users,
    userInfo: []
  };

  // Temp function to add user to data state
  addNewUser = newUser => {
    this.setState({ users: [...this.state.users, newUser] });
  };

  // Responsible for adding new charge to current array
  addNewCharge = charge => {
    this.setState({ charges: [...this.state.charges, charge] });
  };

  // Temp function for when user logs in.
  onSignIn = () => {
    this.setState({
      signedIn: true
    });
    // console.log("User has logged in successfully");
  };

  // Temp func to set charges
  setCharges = user_id => {
    // eslint-disable-next-line
    let matchingCharges = Data.charges.map(charge => {
      if (charge.user_id === user_id) {
        return charge;
      }
    });

    this.setState({ charges: matchingCharges });
  };

  // Temp function to set fake user data
  setUserInfo = user => {
    this.setState({ userInfo: user });
    this.setCharges(user.user_id);

    // console.log(`User info set as ${user}`);
  };

  // Temp function to log user out
  onSignOut = () => {
    this.setState({
      signedIn: false,
      userInfo: []
    });
    // console.log("User has logged out");
  };

  /* State Setting Methods */
  // Responsible for setting user's signedIn status to true or false if JWT present
  checkLoginStatus = () => {
    if (window.sessionStorage.getItem(config.TOKEN_KEY)) {
      this.setState({ signedIn: true });
    } else {
      this.setState({ signedIn: false });
    }
  };

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    const contextValue = {
      // Methods
      addNewUser: this.addNewUser,
      addNewCharge: this.addNewCharge,
      checkLoginStatus: this.checkLoginStatus,
      onSignIn: this.onSignIn,
      onSignOut: this.onSignOut,
      setUserInfo: this.setUserInfo,

      // Values
      charges: this.state.charges,
      signedIn: this.state.signedIn,
      userInfo: this.state.userInfo,
      users: this.state.users
    };
    return (
      <div className="App">
        <balanceContext.Provider value={contextValue}>
          <nav role="navigation">
            <Nav />
          </nav>
          <main role="main">
            <Route exact path="/budgets" component={Budget} />
            <Route path="/createBudget" component={CreateBudget} />
            <Route path="/viewSavings" component={ViewSavings} />
            <Route path="/viewSpending" component={ViewSpending} />

            <Route path="/dashboard" component={Dashboard} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/signOut" component={SignOut} />
            <Route path="/signUp" component={SignUp} />
            <Route exact path="/" component={Landing} />
          </main>
        </balanceContext.Provider>

        <footer role="contentinfo">
          <h5>&copy; 2020.</h5>
        </footer>
      </div>
    );
  }
}

export default App;
