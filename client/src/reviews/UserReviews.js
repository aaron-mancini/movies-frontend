import React, { useState, useEffect, useContext } from "react";
import MoviesApi from "../api/api";
import UserContext from "../auth/UserContext";
import ReviewCard from "./ReviewCard";

const UserReviews = () => {
    const [reviews, setReviews] = useState();
    const [loading, setLoading] = useState(false);
    const { currentUser } = useContext(UserContext);

    useEffect(function getUserReviews() {
        async function getReviews() {
            try {
                let movieReviews = await MoviesApi.getUserReviews(currentUser.username);
                console.log(movieReviews);
                setReviews(movieReviews);
            } catch (error) {
                // ?
            }
            setLoading(true);
        }
        setLoading(false);
        getReviews();
    }, [currentUser]);

    if (!loading) {
        return (
          <div>
    
          </div>
        )
    }

    return (
        <div>
            {reviews.map(r => <ReviewCard key={r.id} review={r.review} rating={r.rating} username={r.username} id={r.id}/>)}
        </div>
    )
}

export default UserReviews;