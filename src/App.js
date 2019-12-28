import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "./config";

/* Custom Components */
import Landing from "./components/landing/landing";
import Nav from "./components/nav/nav";
import SignIn from "./components/signIn/signIn";
import SignUp from "./components/signUp/signUp";

/* Styling & Images */
import "./App.css";

/* Context */
import balanceContext from "./balanceContext";

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
    const contextValue = {
      // Methods
      checkLoginStatus: this.checkLoginStatus,

      // Values
      loggedIn: this.state.loggedIn
    };
    return (
      <div className="App">
        <balanceContext.Provider value={contextValue}>
          <nav role="navigation">
            <Nav />
          </nav>
          <main role="main">
            <Route path="/signIn" component={SignIn} />
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
