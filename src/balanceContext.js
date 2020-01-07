import React from "react";

const balanceContext = React.createContext({
  // Methods
  addNewUser: () => {},
  addNewCharge: () => {},
  checkLoginStatus: () => {},
  onSingIn: () => {},
  onSignOut: () => {},
  setUserInfo: () => {},
  deleteCharge: () => {},
  updateCharge: () => {},

  // Values
  charges: [],
  signedIn: "",
  userInfo: "",
  users: []
});

export default balanceContext;
