import React from "react";
import { Button } from "reactstrap";

const Home = () => {
    return (
        <div>
            <h1>Welcome to FilmRate</h1>
            <h6>Sign up to create your own film reviews!</h6>
            <h6>Or start searching for your favorite film now!</h6>
            <Button href="/signup">Signup</Button>
        </div>
    )
}

export default Home;