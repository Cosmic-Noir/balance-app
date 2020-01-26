import React from "react";
import ReactDom from "react-dom";
import renderer from "react-test-renderer";
import AddIncome from "./addIncome";

describe(`AddIncome Component`, () => {
  it(`Renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDom.render(<AddIncome />, div);
    ReactDom.unmountComponentAtNode(div);
  });

  it(`Renders the UI as expected`, () => {
    const tree = renderer.create(<AddIncome />).toJSON;
    expect(tree).toMatchSnapshot();
  });
});
