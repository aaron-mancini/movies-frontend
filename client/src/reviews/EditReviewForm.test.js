import React from "react";
import { render } from "@testing-library/react";
import EditReviewForm from "./EditReviewForm";
import { MemoryRouter } from "react-router";

it("renders without crashing", function () {
    render(
        <MemoryRouter>
            <EditReviewForm />
        </MemoryRouter>,
    );
});