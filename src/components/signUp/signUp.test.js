import React from "react";
import ReactDom from "react-dom";
import renderer from "react-test-renderer";
import SignUp from "./signUp";
import { BrowserRouter } from "react-router-dom";

describe(`SignUp Component`, () => {
  it(`Renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDom.render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>,
      div
    );
    ReactDom.unmountComponentAtNode(div);
  });

  it(`Renders the UI as expected`, () => {
    const tree = renderer.create(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    ).toJSON;
    expect(tree).toMatchSnapshot();
  });
});
