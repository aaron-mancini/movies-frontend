import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h1>404 page not found</h1>
            <h3>Return <Link to="/">Home</Link></h3>
        </div>
    )
}

export default NotFound;