import React from "react";
import ReactDom from "react-dom";
import renderer from "react-test-renderer";
import Dashboard from "./dashboard";
import { BrowserRouter } from "react-router-dom";

describe(`Dashboard Component`, () => {
  it(`Renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDom.render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
      div
    );
    ReactDom.unmountComponentAtNode(div);
  });

  it(`Renders the UI as expected`, () => {
    const tree = renderer.create(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    ).toJSON;
    expect(tree).toMatchSnapshot();
  });
});
