import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MoviesApi from "./api/api";

const MovieDetails = () => {
    const { title } = useParams();
    console.debug("MovieTitle:", title);

    const [movieInfo, setMovieInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(function getMovieDetails() {
        async function getMovie() {
            try {
                let movie = await MoviesApi.getMovie(title);
                console.log(movie);
                setMovieInfo(movie);
            } catch (error) {
                // nav to movie not found page?
            }
            setLoading(true);
        }
        setLoading(false);
        getMovie();
    }, [title]);

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
        </div>
    )
}

export default MovieDetails;