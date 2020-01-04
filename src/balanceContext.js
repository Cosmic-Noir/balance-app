import React from "react";

const balanceContext = React.createContext({
  // Methods
  addNewuser: () => {},
  checkLoginStatus: () => {},
  onSingIn: () => {},
  onSignOut: () => {},
  setUserInfo: () => {},
  addNewCharge: () => {},

  // Values
  charges: [],
  signedIn: "",
  userInfo: "",
  users: []
});

export default balanceContext;
