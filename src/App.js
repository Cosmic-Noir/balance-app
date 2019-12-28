import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "./config";

/* Custom Components */
import Landing from "./components/landing/landing";
import SignUp from "./components/signUp/signUp";

/* Styling & Images */
import "./App.css";

class App extends Component {
  state = {
    loggedIn: ""
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
    return (
      <div className="App">
        <nav role="navigation"></nav>
        <main role="main">
          <h2>Balance</h2>
          <Route path="/landing" component={Landing} />
          <Route path="/signUp" component={SignUp} />
        </main>
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
