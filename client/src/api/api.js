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

    static async updateProfile(profileData) {
        let res = await this.request(`users`, profileData, "patch");
        return res.user;
    }

    /** Remove a user account */

    static async removeAccount() {
        let res = await this.request(`users`, {}, "delete");
        return res;
    }

    /** Get info about a user */

    static async getUser() {
        let res = await this.request(`users`);
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

    /** Get reviews for a movie */

    static async getMovieReviews(movieId) {
        let res = await this.request(`reviews/${movieId}`);
        return res.reviews;
    }

    /** Get all reviews by a user */

    static async getUserReviews(username) {
        let res = await this.request(`reviews/user/${username}`);
        return res.reviews;
    }

    /** Get a review by Id */

    static async getReviewById(id) {
        let res = await this.request(`reviews/id/${id}`);
        return res.review;
    }

    /** Update a review */

    static async updateReview(movieId, data) {
        let res = await this.request(`reviews/${movieId}`, data, "patch");
        return res.review;
    }

    /** Delete a review */

    static async removeReview(id) {
        let res = await this.request(`reviews/${id}`, {}, "delete");
        return res;
    }
}

export default MoviesApi;