import React from "react";
import { render } from "@testing-library/react";
import ReviewCard from "./ReviewCard";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <ReviewCard />
            </UserProvider>
        </MemoryRouter>,
    );
});