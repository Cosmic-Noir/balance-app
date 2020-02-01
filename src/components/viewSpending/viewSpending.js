import React, { Component } from "react";
import PropTypes from "prop-types";

import * as d3 from "d3";

/* Context */
import balanceContext from "../../balanceContext";

/* Styling and Images */
import "./viewSpending.css";

class ViewSpending extends Component {
  state = {
    selected: "all",
    categories: {}
  };

  static contextType = balanceContext;

  /* State Setting Methods */

  updateSelected = selected => {
    this.setState({ selected });
  };

  /* Custom Methods */

  // Responsible for providing options of monthly budgets
  displayMonths = () => {
    const months = {};
    if (this.context.charges === null) {
      return null;
    } else {
      return this.context.charges.map(charge => {
        const { month_name } = charge;

        if (months[month_name] === true) {
          return null;
        }
        months[month_name] = true;

        return (
          <option value={month_name} key={month_name}>
            {month_name}
          </option>
        );
      });
    }
  };

  // Responsible for returning categories with correct spending amounts
  displayCategories = () => {
    document.getElementById("categories").innerHTML = "";

    let colors = [
      "#a35ab8",
      "#0477BF",
      "#04B2D9",
      "#04BFBF",
      "#04D9B2",
      "#C187C3",
      "#FFFDE8",
      "#A836D9",
      "#D90D6C",
      "#7b6888",
      "#6b486b",
      "#a05d56",
      "#90abc5"
    ];

    let count = 0;
    for (let category in this.state.categories) {
      let color = colors[count];
      document.getElementById(
        "categories"
      ).innerHTML += `<div class="flex-column"><div class="legend" style="background-color:${color}" ></div><h4 class="cat">${category}: ${this.state.categories[category]}<h4></div>`;
      count++;
    }

    // console.log("displayCategories ran");
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setSpending();
  };

  // Responsible for creating an object with totals for each detected categories
  setSpending = () => {
    let categories = {};
    let totalSpent = 0;
    // eslint-disable-next-line
    let charges = this.context.charges.filter(charge => {
      if (charge.category !== "Income") {
        return charge;
      }
    });

    if (this.state.selected === "all") {
      for (let i = 0; i < charges.length; i++) {
        totalSpent += charges[i].amount;
        if (!categories[charges[i].category]) {
          categories[charges[i].category] = charges[i].amount;
        } else {
          categories[charges[i].category] =
            Math.round(
              (categories[charges[i].category] + charges[i].amount) * 100
            ) / 100;
        }
      }
    } else {
      let selectedMonth = this.state.selected;

      // eslint-disable-next-line
      charges = charges.filter(charge => {
        if (charge.month_name === selectedMonth) {
          return charge;
        }
      });
      for (let i = 0; i < charges.length; i++) {
        totalSpent += charges[i].amount;

        if (!categories[charges[i].category]) {
          categories[charges[i].category] = charges[i].amount;
        } else {
          categories[charges[i].category] =
            Math.round(
              (categories[charges[i].category] + charges[i].amount) * 100
            ) / 100;
        }
      }
    }
    this.setState({
      categories: categories,
      totalSpent: Math.round(totalSpent * 100) / 100
    });
    setTimeout(() => {
      this.displayCategories();
      this.createPieCharge();
    });
  };

  createPieCharge = () => {
    let width;
    let height;
    let margin;
    let fontSize;
    if (window.screen.width < 500) {
      width = 310;
      height = 310;
      margin = 30;
      fontSize = 10;
    } else {
      width = 410;
      height = 410;
      margin = 40;
      fontSize = 14;
    }

    let chartDiv = document.getElementById("chart");
    chartDiv.innerHTML = "";

    const radius = Math.min(width, height) / 2 - margin;

    let svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const data = this.state.categories;

    const color = d3
      .scaleOrdinal()
      .domain(data)
      .range([
        "#a35ab8",
        "#0477BF",
        "#04B2D9",
        "#04BFBF",
        "#04D9B2",
        "#C187C3",
        "#FFFDE8",
        "#A836D9",
        "#D90D6C",
        "#7b6888",
        "#6b486b",
        "#a05d56",
        "#90abc5"
      ]);

    const pie = d3.pie().value(function(d) {
      return d.value;
    });

    const data_ready = pie(d3.entries(data));

    svg.attr("class", "chart-svg");

    var arcGenerator = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius + 45);

    svg
      .selectAll("#chart")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(0)
          .outerRadius(radius)
      )
      .attr("fill", function(d) {
        return color(d.data.key);
      })
      .attr("stroke", "black")
      .style("stroke-width", "2px");

    // svg
    //   .selectAll("#chart")
    //   .data(data_ready)
    //   .enter()
    //   .append("text")
    //   .text(function(d) {
    //     return d.data.value;
    //   })
    //   .attr("transform", function(d) {
    //     return "translate(" + arcGenerator.centroid(d) + ")";
    //   })
    //   .style("text-anchor", "middle")
    //   .style("font-size", fontSize);
  };

  render() {
    return (
      <div
        className="back_style viewSpending"
        data-aos="fade-in"
        data-aos-duration="2000"
        id="spending"
      >
        <h2>Spending Report:</h2>

        <form
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <select
            id="select"
            onChange={e => this.updateSelected(e.target.value)}
            name="selected"
            ref={this.selected}
            value={this.state.selected}
          >
            <option value="all">All</option>
            {this.displayMonths()}
          </select>
          <button className="main_button" type="submit">
            Fetch Spending Report
          </button>
        </form>

        <div id="categories"></div>
        <div id="chart"></div>
        <button
          className="main_button"
          type="button"
          onClick={this.props.hideSpendingReport}
        >
          Hide Spending Report
        </button>
      </div>
    );
  }
}

export default ViewSpending;

ViewSpending.propTypes = {
  hideSpendingReport: PropTypes.func
};
