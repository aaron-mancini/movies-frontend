import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem, Form, Input, Button } from "reactstrap";
import UserContext from "../auth/UserContext";

const NavBar = ({ logout }) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const [formData, setFormData] = useState();

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        navigate(`/search?q=${formData.search}`)
    }

    if(currentUser) {
        return (
            <div>
                <Navbar expand="md">
                    <NavLink to="/" className="navbar-brand">Movies</NavLink>
                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <Input 
                            type="search"
                            name="search"
                            placeholder="Search"
                            onChange={handleChange}
                        />
                        <Button type="submit">Search</Button> 
                    </Form>
                    <Nav className="ml-auto" navbar>                  
                        <NavItem>
                            <NavLink to="/profile">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/reviews">My Reviews</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/" onClick={logout}>Log out {currentUser.username}</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
    return (
        <div>
            <Navbar expand="md">
                <NavLink to="/" className="navbar-brand">Movies</NavLink>
                <Form className="d-flex" onSubmit={handleSubmit}>
                    <Input 
                        type="search"
                        name="search"
                        placeholder="Search"
                        onChange={handleChange}
                    />
                    <Button type="submit">Search</Button> 
                </Form>
                <Nav className="ml-auto" navbar>                  
                    <NavItem>
                        <NavLink to="/login">Log In</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/signup">Sign up</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;