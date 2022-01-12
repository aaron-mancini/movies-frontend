import React from "react";

const ReviewCard = ({ review, rating, username }) => {
    return (
        <div>
            <h3>{username}</h3>
            <p>Rating: {rating}/10</p>
            <p>Review: {review}</p>
        </div>
    )
}

export default ReviewCard;