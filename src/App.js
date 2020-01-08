import React, { Component } from "react";
import { Route } from "react-router-dom";
// import { Link } from "react-router-dom";
// import config from "./config";

/* Custom Components */
import Budget from "./components/budget/budget";
import CreateBudget from "./components/createBudget/createBudget";
import ViewSavings from "./components/viewSavings/viewSavings";
import ViewSpending from "./components/viewSpending/viewSpending";

import Dashboard from "./components/dashboard/dashboard";
import Landing from "./components/landing/landing";
import Nav from "./components/nav/nav";
import SignIn from "./components/signIn/signIn";
import SignOut from "./components/signOut/signOut";
import SignUp from "./components/signUp/signUp";

/* Styling & Images */
import "./App.css";

/* Context */
import balanceContext from "./balanceContext";

// Seed Data
import Data from "./data.js";

class App extends Component {
  state = {
    signedIn: "",
    // Initially set to seed data
    charges: [],
    month_name: "",
    month_name_list: [],
    users: Data.users,
    userInfo: []
  };

  // Temp function to add user to data state
  addNewUser = newUser => {
    this.setState({ users: [...this.state.users, newUser] });
  };

  // Responsible for adding new charge to current array
  addNewCharge = charge => {
    this.setState({ charges: [...this.state.charges, charge] }, function() {});
  };

  // Responsible for deleting charge
  deleteCharge = charge_id => {
    const newCharges = this.state.charges.filter(
      charge => charge.charge_id !== charge_id
    );
    this.setState({ charges: newCharges });

    // console.log(`deleteCharge is called`);
  };

  // Responsible for creating month_name_list and then setting month to last entered into array
  getMonthList = () => {
    // console.log(Data.charges);
    let month_list = {};
    for (let i = 0; i < Data.charges.length; i++) {
      // console.log(Data.charges[i].month_name);
      if (month_list[Data.charges[i].month_name] === true) {
      } else {
        month_list[Data.charges[i].month_name] = true;
      }
    }
    let month_name_list = Object.keys(month_list);
    console.log(`getMonthlist ran`);
    this.setMonthList(month_name_list);
  };

  setMonthList = month_name_list => {
    this.setState({ month_name_list: month_name_list }, this.setMonth());
  };

  // Resposible for setting month_name
  setMonth = () => {
    this.setState({ month_name: "Jan 2020" });
  };

  updateCharge = updatedCharge => {
    this.setState({
      charges: this.state.charges.map(charge =>
        charge.charge_id !== updatedCharge.charge_id ? charge : updatedCharge
      )
    });
    // console.log(`updateCharge ran`);
  };

  // Temp function for when user logs in.
  onSignIn = () => {
    this.setState({
      signedIn: true
    });
  };

  // Temp func to set charges matching user_id AND month_name
  setCharges = () => {
    // eslint-disable-next-line

    let matchingCharges = Data.charges.filter(charge => {
      console.log(charge.user_id + " " + this.state.userInfo.user_id);
      console.log(this.state.month_name);
      console.log(charge.month_name);

      if (
        charge.user_id === this.state.userInfo.user_id &&
        charge.month_name === this.state.month_name
      ) {
        return charge;
      }
    });

    this.setState({ charges: matchingCharges });
    console.log(`setCharges ran`);
  };

  // Temp function to set fake user data
  setUserInfo = user => {
    this.setState({ userInfo: user }, this.getMonthList());
  };

  // Temp function to log user out
  onSignOut = () => {
    this.setState({
      signedIn: false,
      userInfo: [],
      charges: []
    });
  };

  /* State Setting Methods */
  // Responsible for setting user's signedIn status to true or false if JWT present
  // checkLoginStatus = () => {
  //   if (window.sessionStorage.getItem(config.TOKEN_KEY)) {
  //     this.setState({ signedIn: true });
  //   } else {
  //     this.setState({ signedIn: false });
  //   }
  // };

  // Responsible for adding days to current date to return a new date
  addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Should split into two functions, one to calculate date string, and the other to check if an additional charge must be added
  addAdditionalCharge = newCharge => {
    let { occurance, charge_name, month_name, due_date } = newCharge;
    // console.log(
    //   `A charge was added, checking to see if we need to add additional charges...`
    // );

    const monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let stringArray = month_name.split(" ");

    let dateString = stringArray[1] + "-";

    let monthString = stringArray[0];

    for (let i = 0; i < monthArray.length; i++) {
      if (monthString === monthArray[i]) {
        monthString = i + 1;
      }
    }

    if (monthString.length === 1) {
      monthString = "0" + monthString;
    }

    dateString += monthString.toString();

    let dayString = due_date.toString();

    if (dayString.length === 1) {
      dayString = "0" + dayString;
    }

    dateString += "-" + dayString;

    if (occurance === "One Time") {
      console.log(
        `${charge_name} is a One Time occurance and will not be re-created in the next budget`
      );
    } else if (occurance === "Monthly") {
      console.log(
        `${charge_name} is a Monthly occurance, will not be adding an aditional charge, but will be on the next budget`
      );
    } else if (occurance === "Biweekly") {
      // console.log(
      //   `${charge_name} is a Biweekly occurance, must add charge every 14 days UNTIL month changes`
      // );
      // console.log(
      //   `Next calculated due_date is ${this.addDays(dateString, 14)}`
      // );
      let nextDueDate = this.addDays(dateString, 14).toString();
      // console.log(nextDueDate);

      let month = nextDueDate.substring(4, 7);
      // console.log(month);

      let day = parseInt(nextDueDate.substring(8, 10));
      // console.log(day);

      if (month === stringArray[0]) {
        console.log("it is the same month, add new bill");
        let newestCharge = newCharge;
        newestCharge.due_date = day;
        console.log(newestCharge.due_date);
        // console.log(newestCharge);
        this.addNewCharge(newestCharge);
      } else {
        console.log("it is a new month! Do not add new charge ");
      }
    } else if (occurance === "Weekly") {
      console.log(
        `${charge_name} is a Weekly occurance, must add charge every 7 days UNTIL month changes`
      );
      console.log(`Next calculated due_date is ${this.addDays(dateString, 7)}`);
    }
    console.log(`addAdditionalCharge has run`);
  };

  componentDidMount() {
    // this.checkLoginStatus();
    console.log("App running...");
    // this.getMonthList();
  }

  render() {
    const contextValue = {
      // Methods
      addNewUser: this.addNewUser,
      addNewCharge: this.addNewCharge,
      checkLoginStatus: this.checkLoginStatus,
      deleteCharge: this.deleteCharge,
      onSignIn: this.onSignIn,
      onSignOut: this.onSignOut,
      setCharges: this.setCharges,
      setMonth: this.setMonth,
      setUserInfo: this.setUserInfo,
      updateCharge: this.updateCharge,

      // Values
      charges: this.state.charges,
      month_name: this.state.month_name,
      month_name_list: this.state.month_name_list,
      signedIn: this.state.signedIn,
      userInfo: this.state.userInfo,
      users: this.state.users
    };
    return (
      <div className="App">
        <balanceContext.Provider value={contextValue}>
          <nav role="navigation">
            <Nav />
          </nav>
          <main role="main">
            <Route exact path="/budgets" component={Budget} />
            <Route path="/createBudget" component={CreateBudget} />
            <Route path="/viewSavings" component={ViewSavings} />
            <Route path="/viewSpending" component={ViewSpending} />

            <Route path="/dashboard" component={Dashboard} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/signOut" component={SignOut} />
            <Route path="/signUp" component={SignUp} />
            <Route exact path="/" component={Landing} />
          </main>
        </balanceContext.Provider>

        <footer role="contentinfo">
          <h5>&copy; 2020.</h5>
        </footer>
      </div>
    );
  }
}

export default App;
