import React from "react";

const balanceContext = React.createContext({
  // Methods
  addNewuser: () => {},
  checkLoginStatus: () => {},
  setUserInfo: () => {},

  // Values
  charges: [],
  signedIn: ""
});

export default balanceContext;
