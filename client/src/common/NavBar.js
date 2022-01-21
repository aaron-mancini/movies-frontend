import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavbarBrand, NavItem, Form, Input, Button, NavbarToggler, Collapse } from "reactstrap";
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
                <Navbar expand="md" color="dark" dark>
                    <NavbarBrand href="/">FilmRate</NavbarBrand>
                    <NavbarToggler onClick={function noRefCheck(){}} />
                    <Collapse navbar>
                        <Nav 
                        className="me-auto" 
                        navbar
                        > 
                            <NavItem>
                                <Form className="d-flex" onSubmit={handleSubmit}>                    
                                    <Input 
                                        type="search"
                                        name="search"
                                        placeholder="Search"
                                        onChange={handleChange}
                                    />
                                    <Button type="submit" className="mx-2">Search</Button> 
                                </Form>
                            </NavItem>
                        </Nav>
                        <Nav>
                            <NavItem className="px-2">
                                <Button href="/profile">Profile</Button>
                            </NavItem>
                            <NavItem>
                                <Button href="/reviews">My Reviews</Button>
                            </NavItem>
                            <NavItem className="px-2">
                                <Button href="/" onClick={logout}>Log out</Button>
                            </NavItem>
                        </Nav>                        
                    </Collapse>
                </Navbar>
            </div>
        );
    }
    return (
        <div>
            <Navbar expand="md" color="dark" dark>
                <NavbarBrand href="/">FilmRate</NavbarBrand>
                <NavbarToggler onClick={function noRefCheck(){}} />
                <Collapse navbar>
                    <Nav
                    className="me-auto"
                    navbar
                    >
                        <NavItem>
                            <Form className="d-flex" onSubmit={handleSubmit}>
                                <Input 
                                    type="search"
                                    name="search"
                                    placeholder="Search"
                                    onChange={handleChange}
                                />
                                <Button type="submit" className="mx-2">Search</Button> 
                            </Form>
                        </NavItem>              
                    </Nav>
                    <Nav>
                        <NavItem className="px-2">
                            <Button href="/login">Log in</Button>
                        </NavItem>
                        <NavItem className="mr-1">
                            <Button href="/signup">Sign up</Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;