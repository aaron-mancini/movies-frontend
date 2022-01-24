import React, { useState } from "react";
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";

const LoginForm = ({ login }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const [formErrors, setFormErrors] = useState([]);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            navigate("/");
        } else {
            setFormErrors(result.error);
        }
    }

    return (
        <div className="pt-5">
            <div className="SignupForm">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <h2 className="mb-3">Log In</h2>
                    <Card>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <Input
                                        name="username"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                {formErrors.length
                                    ? <Alert type="danger" messages={formErrors} />
                                    : null}
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;