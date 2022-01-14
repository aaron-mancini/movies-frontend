import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
