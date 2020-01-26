import React from "react";
import ReactDom from "react-dom";
import renderer from "react-test-renderer";
import Budget from "./budget";

// Unclear how to write these tests with a DOM element registering as null

describe(`Budget Component`, () => {
  it(`Renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDom.render(<Budget testingVal="Feb 2020" />, div);
    ReactDom.unmountComponentAtNode(div);
  });

  it(`Renders the UI as expected`, () => {
    const tree = renderer.create(<Budget testingVal="Feb 2020" />).toJSON;
    expect(tree).toMatchSnapshot();
  });
});
