import React, { useContext, useState } from "react"
import { Form, Input, Button } from "reactstrap";
import UserContext from "./auth/UserContext";

const ReviewForm = ({ movieId, createReview }) => {
    const { currentUser } = useContext(UserContext);

    const [formData, setFormData] = useState({ movieId: movieId });

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        setFormData(fData => ({
            ...fData,
            username: currentUser.username
        }));
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
            <Form onSubmit={handleSubmit}>
                <Input 
                    type="textarea"
                    name="review"
                    onChange={handleChange}
                />
                <Input 
                    type="number"
                    name="rating"
                    max={10}
                    min={1}
                    onChange={handleChange}
                />
                <Button>Post</Button>
            </Form>
        </div>
    )
}

export default ReviewForm;