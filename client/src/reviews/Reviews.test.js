import React from "react";
import { render } from "@testing-library/react";
import Reviews from "./Reviews";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <Reviews />
        </MemoryRouter>,
    );
});