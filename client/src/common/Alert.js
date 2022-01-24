import React from "react";

const Alert = ({ type = "danger", messages = [] }) => {

    return (
        <div>
            {messages.map(e => (
                <p key={e}>
                    {e}
                </p>
            ))}
        </div>
    )
}

export default Alert;