import React, { useContext } from "react";
import { Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

const ReviewCard = ({ review, rating, username, id, title }) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);

    function handleClick() {
        navigate(`/reviews/edit/${id}`);
    }

    function showEditButton() {
        return (
            <Button onClick={handleClick}>Edit/Delete</Button>
        )
    }


    return (
        <div className="p-3">
        <Card>
          <CardBody>
            {title ? <CardTitle tag="h4">{title}</CardTitle> : <CardTitle>User: {username}</CardTitle>}
            <CardText>Rating: {rating}/10</CardText>
            <CardText>Review: {review}</CardText>
            {(currentUser && currentUser.username === username) ? showEditButton() : null}
          </CardBody>
        </Card>
        </div>
    )
}

export default ReviewCard;