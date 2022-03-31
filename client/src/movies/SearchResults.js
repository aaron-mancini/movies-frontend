import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Row } from "reactstrap";
import MoviesApi from "../api/api";
import Loading from "../common/Loading";
import NotFound from "../common/NotFound";
import MovieCard from "./MovieCard";

const SearchResults = () => {
    const [loading, setLoading] = useState(false);
    const [moviesList, setMoviesList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    let searchTerm = searchParams.get("q");

    useEffect(function loadMovieList() {
        async function getMovies() {
            let movies = await MoviesApi.movieSearch(searchTerm);
            console.log(movies);
            setMoviesList(movies.Search);
            console.log(moviesList);
            setLoading(true);
        }
        setLoading(false);
        getMovies();
    }, [searchTerm]);
    
    if (!loading) {
        return (
          <div>
            <Loading />
          </div>
        )
    }

    return (
        <>
            {moviesList
            ? <Row xs={2} md={5} className="g-4 m-2 movies-list">
            {moviesList.map(m => (
                <MovieCard key={m.imdbID} title={m.Title} year={m.Year} poster={m.Poster} type={m.Type}/>
            ))}
            </Row>
            : <NotFound />}
        </>
    )
}

export default SearchResults;