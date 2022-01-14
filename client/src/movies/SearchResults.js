import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import MoviesApi from "../api/api";

const SearchResults = () => {
    const [loading, setLoading] = useState(false);
    const [moviesList, setMoviesList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    let searchTerm = searchParams.get("q");

    useEffect(function loadMovieList() {
        async function getMovies() {
            let movies = await MoviesApi.movieSearch(searchTerm);
            setMoviesList(movies.Search);
            setLoading(true);
        }
        setLoading(false);
        getMovies();
    }, [searchTerm]);

    if (!loading) {
        return (
          <div>
    
          </div>
        )
    }

    return (
        <div>
            {moviesList.map(m => (
                <Link to={`/movie/${m.Title}`}><h1>{m.Title}</h1></Link>
            ))}
        </div>
    )
}

export default SearchResults;