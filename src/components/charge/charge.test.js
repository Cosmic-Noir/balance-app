import React from "react";
import ReactDom from "react-dom";
import renderer from "react-test-renderer";
import Charge from "./charge";

describe(`Charge Component`, () => {
  it(`Renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDom.render(<Charge />, div);
    ReactDom.unmountComponentAtNode(div);
  });

  it(`Renders the UI as expected`, () => {
    const tree = renderer.create(<Charge />).toJSON;
    expect(tree).toMatchSnapshot();
  });
});
