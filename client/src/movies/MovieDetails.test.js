import React from "react";
import { render } from "@testing-library/react";
import MovieDetails from "./MovieDetails";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
          <UserProvider>
            <MovieDetails />
          </UserProvider>
        </MemoryRouter>,
    );
});