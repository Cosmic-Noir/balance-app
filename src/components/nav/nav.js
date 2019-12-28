import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="nav">
      <Link className="nav" to="/">
        Home
      </Link>
      {this.context.loggedIn === true ? (
        <Link className="nav" to="/dashboard">
          Dashboard
        </Link>
      ) : (
        <Link className="nav" to="/dashboard">
          Demo
        </Link>
      )}
      {this.context.loggedIn === false ? (
        <Link id="signUp" to="/signUp">
          Sign Up
        </Link>
      ) : (
        <Link className="nav" onClick={this.handleSignOut} to="/signOut">
          Sign Out
        </Link>
      )}
    </div>
  );
}
