import React from "react";

const balanceContext = React.createContext({
  // Methods
  checkLoginStatus: () => {},
  // Values
  loggedIn: ""
});

export default balanceContext;
