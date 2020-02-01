import React, { Component } from "react";
import config from "../../config";
import PropTypes from "prop-types";

/* Custom Components */
import AddCharge from "../addCharge/addCharge";
import TokenService from "../../auth/token-service";

/* Styling & Images */
import "./charge.css";
import edit from "./images/edit.png";
import deleteImg from "./images/delete.png";

/* Context */
import balanceContext from "../../balanceContext";

class Charge extends Component {
  state = {
    amount: "",
    category: "",
    charge_name: "",
    due_date: "",
    occurance: ""
  };

  static contextType = balanceContext;

  /* State updating methods */

  updateAmount(amount) {
    this.setState({ amount: parseFloat(amount) });
  }

  updateCategory(category) {
    this.setState({ category });
  }

  updateChargeName(charge_name) {
    this.setState({ charge_name });
  }

  updateDueDate(due_date) {
    this.setState({ due_date: parseInt(due_date) });
  }

  updateOccurance(occurance) {
    this.setState({ occurance });
  }

  /* Custom Methods */

  // Responsible for making due_date smaller
  clipDate = () => {
    let smaller = this.props.due_date.substring(5, 10);
    return smaller;
  };

  // Responsible for deleting selected charge in local data
  localChargeDelete = () => {
    this.context.deleteCharge(this.props.charge_id);
    setTimeout(() => {
      this.props.setCharges();
    }, 500);
  };

  // Responsible for DELETE request to server
  remoteDelete = () => {
    const url = `${config.API_ENDPOINT}charges/${this.props.charge_id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            this.setState({ error: error.message });
            throw error;
          });
        }
      })
      .then(this.localChargeDelete);
  };

  /* Event Handling */

  // Responsible for when user clicks delete button
  handleClickDelete = () => {
    if (this.context.signedIn === true) {
      this.remoteDelete();
    } else {
      this.localChargeDelete();
    }
  };

  // Responsible for when user clicks edit button
  handleClickEdit = () => {
    this.setState({ editing: true });
  };

  // Responsible for when user clicks done editing button
  doneEditing = () => {
    this.setState({ editing: false });
  };

  render() {
    return (
      <div className="flex-column chargeWrapper">
        {this.state.editing === true ? (
          <AddCharge
            amount={this.props.amount}
            category={this.props.category}
            charge_id={this.props.charge_id}
            charge_name={this.props.charge_name}
            doneEditing={this.doneEditing}
            due_date={this.props.due_date}
            editing={this.state.editing}
            month_name={this.props.month_name}
            occurance={this.props.occurance}
            setCharges={this.props.setCharges}
            updateNewCharge={this.props.updateNewCharge}
          />
        ) : (
          <div className="charge" id={"charge" + this.props.charge_id}>
            <span className="date_detail">{this.clipDate()}</span>
            <span className="name_detail">{this.props.charge_name}</span>
            <span className="detail">{this.props.amount}</span>
            {this.props.editingBudget === true ? (
              <div className="editDiv">
                <button className="editType" onClick={this.handleClickEdit}>
                  <img alt="Edit button" className="editingImg" src={edit} />
                </button>
                <button
                  className="editType"
                  onClick={this.handleClickDelete}
                  type="button"
                >
                  <img
                    alt="Edit button"
                    className="editingImg"
                    src={deleteImg}
                  />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Charge;

Charge.propTypes = {
  amount: PropTypes.number,
  category: PropTypes.string,
  charge_id: PropTypes.number,
  charge_name: PropTypes.string,
  due_date: PropTypes.string,
  editingBudget: PropTypes.bool,
  month_name: PropTypes.string,
  occurance: PropTypes.string,
  setCharges: PropTypes.func,
  updateNewCharge: PropTypes.func
};
