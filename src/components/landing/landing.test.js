import React from "react";
import ReactDom from "react-dom";
import renderer from "react-test-renderer";
import Landing from "./landing";
import { BrowserRouter } from "react-router-dom";

describe(`Landing Component`, () => {
  it(`Renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDom.render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>,
      div
    );
    ReactDom.unmountComponentAtNode(div);
  });

  it(`Renders the UI as expected`, () => {
    const tree = renderer.create(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    ).toJSON;
    expect(tree).toMatchSnapshot();
  });
});
