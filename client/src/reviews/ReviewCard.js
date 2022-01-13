import React, { useContext } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

const ReviewCard = ({ review, rating, username, id }) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);

    function handleClick() {
        navigate(`/reviews/edit/${id}`);
    }

    function showEditButton() {
        return (
            <Button onClick={handleClick}>Edit/Delete</Button>
        )
    }


    return (
        <div>
            <h3>{username}</h3>
            <p>Rating: {rating}/10</p>
            <p>Review: {review}</p>
            {(currentUser && currentUser.username === username) ? showEditButton() : null}
        </div>
    )
}

export default ReviewCard;