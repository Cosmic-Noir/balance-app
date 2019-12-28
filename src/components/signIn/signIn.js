import React, { Component } from "react";
// import { Link } from "react-router-dom";
import config from "../../config";

/* Custom Components */
// import TokenService from "../../auth/token-service";

class SignIn extends Component {
  state = {
    error: null,
    pass: "",
    username: ""
  };

  /* State Updating Methods */
  updateUsername(username) {
    this.setState({ username: username });
  }

  updatePass(pass) {
    this.setState({ pass: pass });
  }

  /* Custom Methods */

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.username.length < 6) {
      this.setState({
        error: "Error, valid usernames are at least 6 characters"
      });
    } else if (this.state.pass.length < 6) {
      this.setState({
        error: "Error, valid password is at least 6 characters"
      });
    } else {
      this.login();
    }
  };

  render() {
    return (
      <div
        className="flex-column signIn"
        data-aos="fade-in"
        data-aos-duration="1000"
      >
        <form
          className="flex-column formBorder"
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <h2 className="title">Sign In: </h2>
          <input
            className="formInput"
            id="username"
            name="username"
            onChange={e => this.updateUsername(e.target.value)}
            placeholder="username"
            ref={this.username}
            required
            type="username"
          />
          <input
            className="formInput"
            id="pass"
            name="pass"
            onChange={e => this.updatePass(e.target.value)}
            placeholder="password"
            required
            ref={this.pass}
            type="password"
          />
          {this.state.error !== null ? (
            <h4 className="error">{this.state.error}</h4>
          ) : (
            ""
          )}
          <button className="whiteButton" type="submit">
            Log In
          </button>
        </form>
      </div>
    );
  }
}

export default SignIn;
