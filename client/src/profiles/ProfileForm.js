import React, { useState, useContext } from "react";
import { Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import MoviesApi from "../api/api";
import UserContext from "../auth/UserContext";

const ProfileForm = ({ logout }) => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        password: "",
    });

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        
        let profile = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        }

        let updateUser;

        try {
            updateUser = await MoviesApi.updateProfile(profile);
        } catch (error) {
            return;
        }

        setFormData(fData => ({
            ...fData,
            password: ""
        }));
        
        setCurrentUser(updateUser);
        alert("Profile saved!");
    }

    async function handleDelete() {
        let deleteConfirm = prompt("Please type in your username to confirm account deletion. WARNING THIS ACTION CANNOT BE UNDONE! Click cancel to cancel");
        
        if (deleteConfirm === currentUser.username) {
            try {
                navigate("/");
                let result = await MoviesApi.removeAccount();
                logout();
                if (result.deleted) {
                    alert("Account Deleted!");
                }   
            } catch (error) {
                alert("Error, account not deleted.")
            }

        }
    }

    return (
        <div className="pt-5">
            <div className="SignupForm">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <h2 className="mb-3">Profile</h2>
                    
                    <Card>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <p>{currentUser.username}</p>
                                </FormGroup>
                                <FormGroup>
                                    <Label>First name</Label>
                                    <Input                                        
                                        name="firstName"
                                        placeholder={currentUser.firstName}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Last name</Label>
                                    <Input
                                        name="lastName"
                                        placeholder={currentUser.lastName}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder={currentUser.email}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Confirm password to make changes</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <Button type="submit" color="primary">
                                    Save Changes
                                </Button>
                                <Button onClick={handleDelete} className="mx-2">
                                    Delete Profile
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm;