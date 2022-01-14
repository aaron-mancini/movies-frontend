import React from "react";
import { render } from "@testing-library/react";
import ReviewForm from "./ReviewForm";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <UserProvider>
                <ReviewForm />
            </UserProvider>
        </MemoryRouter>,
    );
});