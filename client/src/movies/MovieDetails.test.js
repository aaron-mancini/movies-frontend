import React from "react";
import { render } from "@testing-library/react";
import MovieDetails from "./MovieDetails";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <MovieDetails />
        </MemoryRouter>,
    );
});