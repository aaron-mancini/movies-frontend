import React from "react";
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading">
                <FontAwesomeIcon icon={faGear} spin size="7x"/>
                <h1>Loading</h1>
            </div>
        </div>
    )
}

export default Loading;