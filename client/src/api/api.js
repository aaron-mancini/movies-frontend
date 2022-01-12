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
}

export default MoviesApi;