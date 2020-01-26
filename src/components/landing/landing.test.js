import React from "react";
import ReactDom from "react-dom";
import renderer from "react-test-renderer";
import Landing from "./landing";

describe(`Landing Component`, () => {
  it(`Renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDom.render(<Landing />, div);
    ReactDom.unmountComponentAtNode(div);
  });

  it(`Renders the UI as expected`, () => {
    const tree = renderer.create(<Landing />).toJSON;
    expect(tree).toMatchSnapshot();
  });
});
