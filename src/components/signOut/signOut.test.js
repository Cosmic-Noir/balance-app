import React from "react";
import ReactDom from "react-dom";
import renderer from "react-test-renderer";
import SignOut from "./signOut";
import { BrowserRouter } from "react-router-dom";

describe(`SignOut Component`, () => {
  it(`Renders without crashing`, () => {
    const div = document.createElement("div");
    ReactDom.render(
      <BrowserRouter>
        <SignOut />
      </BrowserRouter>,
      div
    );
    ReactDom.unmountComponentAtNode(div);
  });

  it(`Renders the UI as expected`, () => {
    const tree = renderer.create(
      <BrowserRouter>
        <SignOut />
      </BrowserRouter>
    ).toJSON;
    expect(tree).toMatchSnapshot();
  });
});
