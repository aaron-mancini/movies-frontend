import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavbarBrand, NavItem, Form, Input, Button, NavbarToggler, Collapse } from "reactstrap";
import UserContext from "../auth/UserContext";

const NavBar = ({ logout }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
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

    const handleClick = () => {
        setExpanded(expanded ? false : true);
    }

    if(currentUser) {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">FilmRate</NavbarBrand>
                    <NavbarToggler onClick={handleClick} />
                    <Collapse navbar isOpen={expanded}>
                        <Nav 
                        className="me-auto" 
                        navbar
                        > 
                            <NavItem className="py-2">
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
                        <Nav className="d-flex flex-row-reverse">
                            <NavItem className="p-2">
                                <Button href="/profile">Profile</Button>
                            </NavItem>
                            <NavItem className="py-2">
                                <Button href="/reviews">My Reviews</Button>
                            </NavItem>
                            <NavItem className="p-2">
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
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">FilmRate</NavbarBrand>
                <NavbarToggler onClick={handleClick} />
                <Collapse navbar isOpen={expanded}>
                    <Nav
                    className="me-auto"
                    navbar
                    >
                        <NavItem className="py-2">
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
                    <Nav className="d-flex flex-row-reverse">
                        <NavItem className="p-2">
                            <Button href="/login">Log in</Button>
                        </NavItem>
                        <NavItem className="mr-1 py-2">
                            <Button href="/signup">Sign up</Button>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;