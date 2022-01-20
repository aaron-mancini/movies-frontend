import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MoviesApi from "../api/api";
import ReviewForm from "../reviews/ReviewForm";
import Reviews from "../reviews/Reviews";

const MovieDetails = () => {
    const { title } = useParams();
    console.debug("MovieTitle:", title);

    const [movieInfo, setMovieInfo] = useState();
    const [movieId, setMovieId] = useState();
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(function getMovieDetails() {
        async function getMovie() {
            try {
                let movie = await MoviesApi.getMovie(title);      
                setMovieInfo(movie);
                setMovieId(movie.imdbID);
                let movieReviews = await MoviesApi.getMovieReviews(movieId);
                setReviews(movieReviews);
            } catch (error) {
                // nav to movie not found page?
            }
            setLoading(true);
        }
        setLoading(false);
        getMovie();
    }, [title, movieId]);

    async function createReview(data) {
        try {
          let result = await MoviesApi.createReview(data);
          setReviews(d => ([...d, result]))
          return { success: true }
        } catch (error) {
          console.error("review post failed", error);
          return { success: false, error };
        }
      }


    console.log(movieInfo);

    if (!loading) {
        return (
          <div>
    
          </div>
        )
      }

    return (
        <div>
            <img src={movieInfo.Poster} alt={`${movieInfo.Title} poster`}></img>
            <h1>{movieInfo.Title}</h1>
            <p>Year: {movieInfo.Year}</p>
            <Reviews reviews={reviews}/>
            <ReviewForm movieId={movieInfo.imdbID} createReview={createReview} />
        </div>
    )
}

export default MovieDetails;