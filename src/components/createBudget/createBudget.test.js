import React from "react";
import ReactDom from "react-dom";
import renderer from "react-test-renderer";
import CreateBudget from "./createBudget";

describe.skip(`CreateBudget Component`, () => {
  it(`Renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDom.render(<CreateBudget />, div);
    ReactDom.unmountComponentAtNode(div);
  });

  it(`Renders the UI as expected`, () => {
    const tree = renderer.create(<CreateBudget />).toJSON;
    expect(tree).toMatchSnapshot();
  });
});
