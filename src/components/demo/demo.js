import React, { Component } from "react";
import "./demo.css";

class Demo extends Component {
  state = {
    phase: 1
  };

  // Responsible for increasing state of phase when user clicks next
  increasePhase = () => {
    this.setState({ phase: this.state.phase + 1 });
  };

  render() {
    return (
      <div>
        {this.state.phase === 1 ? (
          <div className="demo phase_one tip">
            <h2 id="text_one">
              Welcome to your demo! This brief tutorial will show you how to use
              this app
            </h2>
            <button
              className="animated demo_button infinite main_button pulse"
              id="phase_one"
              onClick={this.increasePhase}
              type="button"
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
        {this.state.phase === 2 ? (
          <div className="demo phase_two">
            <h2 className="tip">
              Select any existing budget from this drop down.
            </h2>
            <button
              className="animated demo_button infinite main_button pulse"
              id="phase_two"
              onClick={this.increasePhase}
              type="button"
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
        {this.state.phase === 3 ? (
          <div className="demo phase_three">
            <h2 className="tip">
              Add bills or Income by clicking these buttons. Note that
              "One-Time" charges/income will not be imported to newly created
              budgets.
            </h2>
            <button
              className="animated demo_button infinite main_button pulse"
              id="phase_three"
              onClick={this.increasePhase}
              type="button"
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
        {this.state.phase === 4 ? (
          <div className="demo phase_four">
            <h2 className="tip">
              Edit any charges or income by clicking this button
            </h2>
            <button
              className="animated demo_button infinite main_button pulse"
              id="phase_four"
              onClick={this.increasePhase}
              type="button"
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
        {this.state.phase === 5 ? (
          <div className="demo phase_five">
            <h2 className="tip">Click here to view your Spending Report</h2>
            <button
              className="animated demo_button infinite main_button pulse"
              onClick={this.increasePhase}
              id="phase_five"
              type="button"
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
        {this.state.phase === 6 ? (
          <div className="demo phase_six tip">
            <h2 id="text_six">
              See how easy that was? Time to balance your budget!
            </h2>
            <button
              className="animated demo_button infinite main_button pulse"
              onClick={this.increasePhase}
              type="button"
              id="phase_six"
            >
              Finish
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Demo;
