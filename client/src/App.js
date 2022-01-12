import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import MoviesApi from './api/api';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import Home from './Home';
import NavBar from './NavBar';
import SearchResults from './SearchResults';
import MovieDetails from './MovieDetails';
import UserContext from './auth/UserContext';
import ProfileForm from './ProfileForm';

export const TOKEN_STORAGE_ID = "movie-token";

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  /** If a user signs in a gets a token info about the user will be stored */

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let username = await MoviesApi.decodeToken({token});

          MoviesApi.token = token;
          let currentUser = await MoviesApi.getUser(username);
          setCurrentUser(currentUser);
        } catch (error) {
          setCurrentUser(null);
        }
      }
      setLoading(true);
    }
    setLoading(false);
    getCurrentUser();
  }, [token]);

  /** Registers a user */

  async function signup(data) {
    try {
      let token = await MoviesApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (error) {
      console.error("signup failed", error);
      return { success: false, error };
    }
  }

  /** Log in a user */

  async function login(data) {
    try {
      let token = await MoviesApi.login(data);
      setToken(token);
      return { success: true };
    } catch (error) {
      return { success: false, error }
    }
  }

  /** Logout a user */

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Create a review */

  // async function createReview(data) {
  //   try {
  //     await MoviesApi.createReview(data);
  //     return { success: true }
  //   } catch (error) {
  //     console.error("review post failed", error);
  //     return { success: false, error };
  //   }
  // }

  if (!loading) {
    return (
      <div>

      </div>
    )
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar logout={logout}/>
        <Routes>
          <Route path="/" element={<Home />}/>

          <Route path="/search" element={<SearchResults />}/>
          <Route path="/movie/:title" element={<MovieDetails />}/>
          <Route path="/profile" element={<ProfileForm logout={logout}/>} />

          <Route path="/login" element={<LoginForm login={login}/>}/>
          <Route path="/signup" element={<SignupForm signup={signup}/>}/>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
