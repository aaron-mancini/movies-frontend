import React, { useEffect, useState } from "react";
import MoviesApi from "../api/api";
import ReviewCard from "./ReviewCard";

const Reviews = ({ movieId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(function getMovieReviews() {
        async function getReviews() {
            try {
                let movieReviews = await MoviesApi.getMovieReviews(movieId);
                setReviews(movieReviews);
            } catch (error) {
                // ?
            }
            setLoading(true);
        }
        setLoading(false);
        getReviews();
    }, [movieId]);

    console.log("Movie Id:", movieId)
    console.log("Reviews:", reviews);

    if (!loading) {
        return (
          <div>
    
          </div>
        )
      }

    return (
        <>
            {reviews.map(r => <ReviewCard key={r.username} review={r.review} rating={r.rating} username={r.username}/>)}
        </>
    )
}

export default Reviews;