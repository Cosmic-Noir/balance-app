import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "./config";

/* Custom Components */
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

  // Temp function for when user logs in.
  onSignIn = () => {
    this.setState({
      loggedIn: true
    });
    console.log("User has logged in successfully");
  };

  // Temp function to log user out
  onSignOut = () => {
    this.setState({
      loggedIn: false,
      userInfo: []
    });
    console.log("User has logged out");
  };

  // Temp function to set fake user data
  setUserInfo = user => {
    this.setState({ userInfo: user });
    console.log(`User info set as ${user}`);
  };

  /* State Setting Methods */
  // Responsible for setting user's loggedIn status to true or false if JWT present
  checkLoginStatus = () => {
    if (window.sessionStorage.getItem(config.TOKEN_KEY)) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  };

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    const contextValue = {
      // Methods
      addNewUser: this.addNewUser,
      checkLoginStatus: this.checkLoginStatus,
      onSignIn: this.onSignIn,
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
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/signOut" component={SignOut} />
            <Route path="/signUp" component={SignUp} />
            <Route exact path="/" component={Landing} />
          </main>
        </balanceContext.Provider>

        <footer role="contentinfo">
          {this.state.loggedIn === false ? (
            <Link to="/signUp" id="footerSignUp">
              Sign Up
            </Link>
          ) : (
            ""
          )}
          <h5>&copy; 2020.</h5>
        </footer>
      </div>
    );
  }
}

export default App;
