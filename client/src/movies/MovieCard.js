import React from "react";
import { Card, CardImg, CardBody, CardTitle, Col, CardText } from "reactstrap";

const MovieCard = ({ title, year, poster, type }) => {
    return (
        <Col>
            <a href={`/movie/${year}/${title}`}>
            <Card>
                <CardImg
                    alt="poster"
                    src={`${poster}`}
                    top
                    width="50%"
                />
                <CardBody>
                    <CardTitle tag="h5">
                        {title}
                    </CardTitle>
                    <CardText>
                        {year}
                    </CardText>
                </CardBody>
            </Card>
            </a>
        </Col>
    )
}

export default MovieCard;