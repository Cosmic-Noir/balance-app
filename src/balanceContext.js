import React from "react";

const balanceContext = React.createContext({
  // Methods
  addNewUser: () => {},
  addNewCharge: () => {},
  checkLoginStatus: () => {},
  deleteCharge: () => {},
  onSingIn: () => {},
  onSignOut: () => {},
  setCharges: () => {},
  setUserInfo: () => {},
  updateCharge: () => {},

  // Values
  charges: [],
  signedIn: "",
  userInfo: "",
  users: []
});

export default balanceContext;
