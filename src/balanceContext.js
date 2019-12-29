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
  userInfo: "",
  users: []
});

export default balanceContext;
