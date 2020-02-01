import React, { Component } from "react";
import { Route } from "react-router-dom";
// import { Link } from "react-router-dom";
import config from "./config";

/* Custom Components */
import Budget from "./components/budget/budget";
import CreateBudget from "./components/createBudget/createBudget";
import Dashboard from "./components/dashboard/dashboard";
import Landing from "./components/landing/landing";
import Nav from "./components/nav/nav";
import SignIn from "./components/signIn/signIn";
import SignOut from "./components/signOut/signOut";
import SignUp from "./components/signUp/signUp";
import TokenService from "./auth/token-service";

/* Styling & Images */
import "./App.css";

/* Context */
import balanceContext from "./balanceContext";

// Seed Data - Could be used for demo data
import Data from "./data.js";

class App extends Component {
  state = {
    signedIn: "",
    // Initially set to seed data
    charges: []
  };

  /* State Setting/Updating Methods */

  // Responsible for adding new charge to state
  addNewCharge = charge => {
    this.setState({ charges: [...this.state.charges, charge] });
  };

  // Responsible for deleting charge from state
  deleteCharge = charge_id => {
    const newCharges = this.state.charges.filter(
      charge => charge.charge_id !== charge_id
    );
    this.setState({ charges: newCharges });
  };

  // Responsible for updating a charge in state
  updateCharge = updatedCharge => {
    this.setState({
      charges: this.state.charges.map(charge =>
        charge.charge_id !== updatedCharge.charge_id ? charge : updatedCharge
      )
    });
  };

  // Temp function for when user logs in.
  onSignIn = () => {
    this.setState({
      signedIn: true
    });
    this.checkLoginStatus();
  };

  // Responsible for taking GET response and setting state to recieved charges
  setCharges = responseCharges => {
    this.setState({ charges: responseCharges });
  };

  // Temp function to log user out
  onSignOut = () => {
    this.setState({
      signedIn: false,
      userInfo: []
    });
  };

  /* Custom Methods */

  // Responsible for requesting all charges matching user_id upon login
  getMatchingCharges = () => {
    const url = `${config.API_ENDPOINT}charges/`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setCharges);
  };

  // Responsible for setting user's signedIn status to true or false if JWT present
  checkLoginStatus = () => {
    if (window.sessionStorage.getItem(config.TOKEN_KEY)) {
      this.setState({ signedIn: true });
      this.getMatchingCharges();
    } else {
      this.setState({ signedIn: false });
      this.setCharges(Data.charges);
    }
  };

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    const contextValue = {
      // Methods
      addNewCharge: this.addNewCharge,
      checkLoginStatus: this.checkLoginStatus,
      deleteCharge: this.deleteCharge,
      onSignIn: this.onSignIn,
      onSignOut: this.onSignOut,
      updateCharge: this.updateCharge,

      // Values
      charges: this.state.charges,
      signedIn: this.state.signedIn,
      userInfo: this.state.userInfo
    };
    return (
      <div className="App">
        <balanceContext.Provider value={contextValue}>
          <nav role="navigation">
            <Nav />
          </nav>
          <main role="main flex-column">
            <Route exact path="/budgets" component={Budget} />
            <Route path="/createBudget" component={CreateBudget} />
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
