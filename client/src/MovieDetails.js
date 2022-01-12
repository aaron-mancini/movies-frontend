import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MoviesApi from "./api/api";
import ReviewForm from "./ReviewForm";
import Reviews from "./reviews/Reviews";

const MovieDetails = ({ createReview }) => {
    const { title } = useParams();
    console.debug("MovieTitle:", title);

    const [movieInfo, setMovieInfo] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(function getMovieDetails() {
        async function getMovie() {
            try {
                let movie = await MoviesApi.getMovie(title);                
                setMovieInfo(movie);
            } catch (error) {
                // nav to movie not found page?
            }
            setLoading(true);
        }
        setLoading(false);
        getMovie();
    }, [title]);



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
            <Reviews movieId={movieInfo.imdbID}/>
            <ReviewForm movieId={movieInfo.imdbID} createReview={createReview} />
        </div>
    )
}

export default MovieDetails;