import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class MoviesApi {

    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${MoviesApi.token}` };
        const params = (method === "get") ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (error) {
            console.error("API Error:", error.response);
            let message = error.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // API Routes

    /** Signup a user. */

    static async signup(data) {
        let res = await this.request(`users`, data, "post");
        return res.token;
    }

    /** Login a user */

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** Update a user profile */

    static async updateProfile(username, profileData) {
        let res = await this.request(`users/${username}`, profileData, "patch");
        return res.user;
    }

    /** Remove a user account */

    static async removeAccount(username) {
        let res = await this.request(`users/${username}`, {}, "delete");
        return res;
    }

    /** Get info about a user */

    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Decode jwt token on the backend */

    static async decodeToken(token) {
        let res = await this.request(`auth/decode`, token, "post")
        return res.username;
    }

    /** Search for a movie */

    static async movieSearch(term) {
        let res = await this.request(`movies/search/${term}`);
        return res.movie;
    }

    /** Get movie details */

    static async getMovie(title) {
        let res = await this.request(`movies/${title}`);
        return res.movie;
    }

    /** Create a review */

    static async createReview(data) {
        let res = await this.request(`reviews`, data, "post");
        return res.review;
    }

    /** Get reveiws for a movie */

    static async getMovieReviews(movieId) {
        let res = await this.request(`reviews/${movieId}`);
        return res.reviews;
    }
}

export default MoviesApi;