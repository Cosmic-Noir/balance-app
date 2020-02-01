import React, { Component } from "react";
import config from "../../config";
import PropTypes from "prop-types";

/* Custom Components */
import TokenService from "../../auth/token-service";

/* Styling & Images */
import "./charge.css";
import edit from "./images/edit.png";
import deleteImg from "./images/delete.png";

/* Context */
import balanceContext from "../../balanceContext";
import AddCharge from "../addCharge/addCharge";

class Charge extends Component {
  state = {
    amount: "",
    charge_name: "",
    category: "",
    due_date: "",
    occurance: ""
  };

  static contextType = balanceContext;

  /* State updating methods */
  updateChargeName(charge_name) {
    this.setState({ charge_name });
  }

  updateOccurance(occurance) {
    this.setState({ occurance });
  }

  updateAmount(amount) {
    this.setState({ amount: parseFloat(amount) });
  }

  updateCategory(category) {
    this.setState({ category });
  }

  updateDueDate(due_date) {
    this.setState({ due_date: parseInt(due_date) });
  }

  /* Custom Methods */

  handleClickDelete = () => {
    if (this.context.signedIn === true) {
      this.remoteDelete();
    } else {
      this.localChargeDelete();
    }
    // console.log(this.props.charge_id);
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

  localChargeDelete = () => {
    this.context.deleteCharge(this.props.charge_id);
    setTimeout(() => {
      this.props.setCharges();
    }, 500);
  };

  // Responsible for setting editing to true, thus revealing form with values instead of charge line
  handleClickEdit = () => {
    this.setState({ editing: true });
  };

  // Responsible for changing editing to false, thus revleaing charge line instead of form
  handleClickUpdate = () => {
    this.setState({ editing: false });
    // IF new === true, then call addCharge function for each listed charge.
  };

  clipDate = () => {
    let smaller = this.props.due_date.substring(5, 10);
    return smaller;
  };

  componentDidMount() {}

  render() {
    return (
      <div
        className="flex-column chargeWrapper"
        data-aos="fade-in"
        data-aos-duration="2000"
      >
        {this.state.editing === true ? (
          <AddCharge
            amount={this.props.amount}
            editing={this.state.editing}
            charge_id={this.props.charge_id}
            charge_name={this.props.charge_name}
            due_date={this.props.due_date}
            category={this.props.category}
            occurance={this.props.occurance}
            month_name={this.props.month_name}
            handleClickUpdate={this.handleClickUpdate}
            updateNewCharge={this.props.updateNewCharge}
            setCharges={this.props.setCharges}
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
  month_name: PropTypes.string.isRequired,
  occurance: PropTypes.string,
  setCharges: PropTypes.func.isRequired,
  updateNewCharge: PropTypes.func.isRequired
};
