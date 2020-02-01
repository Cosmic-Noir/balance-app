import React, { Component } from "react";
import "./demo.css";

class Demo extends Component {
  state = {
    phase: 1
  };

  increasePhase = () => {
    this.setState({ phase: this.state.phase + 1 });
  };

  render() {
    return (
      <div>
        {this.state.phase === 1 ? (
          <div className="demo phase_one tip">
            <h2 id="text_one">
              Welcome to your demo tour! This breif tutorial will show you how
              the app works.
            </h2>
            <button
              className="animated infinite pulse demo_button main_button"
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
              className="animated infinite pulse demo_button main_button"
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
              className="animated infinite pulse demo_button main_button"
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
              className="animated infinite pulse demo_button main_button"
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
              className="animated infinite pulse demo_button main_button"
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
          <div className="demo phase_one tip">
            <h2>See how easy that was? Time to balance your budget!</h2>
            <button
              className="animated infinite pulse demo_button main_button"
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
