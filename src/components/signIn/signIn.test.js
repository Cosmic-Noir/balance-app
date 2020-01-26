import React from "react";
import ReactDom from "react-dom";
import renderer from "react-test-renderer";
import SignIn from "./signIn";
import { BrowserRouter } from "react-router-dom";

describe(`SignIn Component`, () => {
  it(`Renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDom.render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
      div
    );
    ReactDom.unmountComponentAtNode(div);
  });

  it(`Renders the UI as expected`, () => {
    const tree = renderer.create(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    ).toJSON;
    expect(tree).toMatchSnapshot();
  });
});
