import React from "react";

const balanceContext = React.createContext({
  // Methods
  addNewuser: () => {},
  checkLoginStatus: () => {},
  onSingIn: () => {},
  setUserInfo: () => {},

  // Values
  charges: [],
  signedIn: "",
  users: []
});

export default balanceContext;
