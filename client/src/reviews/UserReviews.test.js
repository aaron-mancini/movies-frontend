import React from "react";
import { render } from "@testing-library/react";
import UserReviews from "./UserReviews";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <UserReviews />
            </UserProvider>
        </MemoryRouter>,
    );
});