import React from "react";

const balanceContext = React.createContext({
  // Methods
  addNewuser: () => {},
  checkLoginStatus: () => {},
  onSingIn: () => {},
  onSignOut: () => {},
  setUserInfo: () => {},

  // Values
  charges: [],
  signedIn: "",
  userInfo: "",
  users: []
});

export default balanceContext;
