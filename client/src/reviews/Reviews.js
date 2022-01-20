import React from "react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviews }) => {

    return (
        <>
            {reviews.map(r => <ReviewCard key={r.username} review={r.review} rating={r.rating} username={r.username} id={r.id}/>)}
        </>
    )
}

export default Reviews;