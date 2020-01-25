import React from "react";

const balanceContext = React.createContext({
  // Methods
  // addNewuser: () => {},
  checkLoginStatus: () => {},
  onSingIn: () => {},
  onSignOut: () => {},
  addNewCharge: () => {},
  deleteCharge: () => {},
  updateCharge: () => {},

  // Values
  charges: [],
  signedIn: "",
  userInfo: ""
});

export default balanceContext;
