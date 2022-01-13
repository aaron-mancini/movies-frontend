import React, { useState } from "react";
import { Button, Card, CardBody, Form, FormGroup, Label, Input } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import MoviesApi from "../api/api";

const EditReviewForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(function getReview() {
        async function get() {
            try {
                let review = await MoviesApi.getReviewById(id);
                setFormData(review);
            } catch (error) {
                // ?
            }
            setLoading(true);
        }
        setLoading(false);
        get();
    }, [id]);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        
        let review = {
            review_text: formData.review,
            rating: formData.rating,
        }

        let username = formData.username;
        let movieId = formData.movie_id;

        try {
            await MoviesApi.updateReview(username, movieId, review)
        } catch (error) {
            return;
        }
    }

    async function handleDelete() {
        let deleteConfirm = prompt("Please type in delete to confirm review deletion");
        
        if (deleteConfirm === "delete") {
            try {
                navigate("/reviews");
                let result = await MoviesApi.removeReview(id);
                if (result.deleted) {
                    alert("Review deleted!");
                }   
            } catch (error) {
                alert("Error, review not deleted.")
            }

        }
    }

    if (!loading) {
        return (
          <div>
    
          </div>
        )
    }

    return (
        <div className="pt-5">
            <div className="SignupForm">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <h2 className="mb-3">Profile</h2>
                    <Button onClick={handleDelete}>Delete Review</Button>
                    <Card>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <p>{formData.username}</p>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Review</Label>
                                    <Input                                        
                                        name="review"
                                        placeholder={formData.review}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Rating</Label>
                                    <Input                                    
                                        type="number"
                                        max={10}
                                        min={1}
                                        name="rating"
                                        placeholder={formData.rating}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <Button type="submit" color="primary">
                                    Save Changes
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default EditReviewForm;