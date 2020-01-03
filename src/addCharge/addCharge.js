import React, { Component } from "react";
// import config from "../../config";

/* Custom Components */
import TokenService from "../../auth/token-service";

/* Context */
import balanceContext from "../../balanceContext";

class AddCharge extends Component {
  state = {
    // Will randomly create charge_id for now
    charge_id: "",
    charge_name: "",
    category: "",
    due_date: "",
    amount: "",
    month_name: "",
    user_id: ""
  };

  static contextType = balanceContext;
}

export default AddCharge;
