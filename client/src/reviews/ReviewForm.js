import React, { useContext, useEffect, useState } from "react"
import { Form, Input, Button, Card, CardBody, Label } from "reactstrap";
import UserContext from "../auth/UserContext";

const ReviewForm = ({ movieId, createReview, title }) => {
    const { currentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({ movieId: movieId, title: title });

    useEffect(function setUsername() {
        if(currentUser) {
            setFormData(fData => ({
                ...fData,
                username: currentUser.username
            }));
        }
    }, [currentUser])

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        await createReview(formData);
    }

    if(!currentUser) {
        return (
            <>
            
            </>
        )
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <Label>Review</Label>
                        <Input 
                            type="textarea"
                            name="review"
                            onChange={handleChange}
                        />
                        <Label>Rating out of 10</Label>
                        <Input 
                            type="number"
                            name="rating"
                            max={10}
                            min={1}
                            onChange={handleChange}
                        />
                        <Button className="mt-2">Post</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default ReviewForm;