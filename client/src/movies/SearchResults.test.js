import React from "react";
import { render } from "@testing-library/react";
import SearchResults from "./SearchResults";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <SearchResults />
        </MemoryRouter>,
    );
});