import React from "react";
import ReactDom from "react-dom";
import renderer from "react-test-renderer";
import AddCharge from "./addCharge";

describe(`AddCharge Component`, () => {
  it(`Renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDom.render(<AddCharge />, div);
    ReactDom.unmountComponentAtNode(div);
  });
});
