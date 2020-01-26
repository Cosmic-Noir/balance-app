import React from "react";
import ReactDom from "react-dom";
import renderer from "react-test-renderer";
import ViewSpending from "./viewSpending";

describe(`ViewSpending Component`, () => {
  it(`Renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDom.render(<ViewSpending />, div);
    ReactDom.unmountComponentAtNode(div);
  });

  it(`Renders the UI as expected`, () => {
    const tree = renderer.create(<ViewSpending />).toJSON;
    expect(tree).toMatchSnapshot();
  });
});
