import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import MoviesApi from "../api/api";
import ReviewForm from "../reviews/ReviewForm";
import Reviews from "../reviews/Reviews";
import UserContext from "../auth/UserContext";
import NotFound from "../common/NotFound";

const MovieDetails = () => {
    const { title } = useParams();
    console.debug("MovieTitle:", title);

    const [movieInfo, setMovieInfo] = useState();
    const [movieId, setMovieId] = useState();
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const { currentUser } = useContext(UserContext);

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

    if (movieInfo.Response === "False") {
      return (
        <NotFound />
      )
    }

    return (
        <div className="pt-5">
          <Container>
            <Row>
              <Col>
                <div>
                  <img src={movieInfo.Poster} alt={`${movieInfo.Title} poster`}></img>
                  <h1>{movieInfo.Title}</h1>
                </div>
              </Col>
              <Col>
                <div>
                  <h3>Film Info</h3>
                  <h6>Year: {movieInfo.Year}</h6>
                  <h6>Rated: {movieInfo.Rated}</h6>
                  <h6>Genre: {movieInfo.Genre}</h6>
                  <h6>Language: {movieInfo.Language}</h6>
                  <h6>Director: {movieInfo.Director}</h6>
                  <h6>Writer: {movieInfo.Writer}</h6>
                  <h6>Released: {movieInfo.Released}</h6>
                  <h6>BoxOffice: {movieInfo.BoxOffice}</h6>
                  <h6>Runtime: {movieInfo.Runtime}</h6>
                  <h6>Actors: {movieInfo.Actors}</h6>
                  <h6>Plot: {movieInfo.Plot}</h6>
                </div>
              </Col>
            </Row>
            <hr></hr>
              <div className="container col-md-6 offset-md-3 col-lg-6">              
              {
              (reviews.some(r => r.username === currentUser.username)) ? 
              <div></div> : 
              <div>
                <h2>Write a review!</h2>
                <ReviewForm movieId={movieInfo.imdbID} title={movieInfo.Title} createReview={createReview} />
                <hr></hr>
              </div>
              }
              </div>          
            <h2>FilmRate Reviews</h2>
            <Row xs={1} md={2} className="g-4 m-5">
              <Reviews reviews={reviews}/>
            </Row>
                        
          </Container>

        </div>
    )
}

export default MovieDetails;