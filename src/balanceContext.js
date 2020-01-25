import React from "react";

const balanceContext = React.createContext({
  // Methods
  // addNewuser: () => {},
  checkLoginStatus: () => {},
  onSingIn: () => {},
  onSignOut: () => {},
  getMatchingCharges: () => {},
  addNewCharge: () => {},
  deleteCharge: () => {},
  updateCharge: () => {},

  // Values
  charges: [],
  signedIn: "",
  userInfo: ""
});

export default balanceContext;
