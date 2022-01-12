import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, Form, Input, Button } from "reactstrap";
import UserContext from "./auth/UserContext";

const NavBar = ({ logout }) => {
    const { currentUser } = useContext(UserContext);
    if(currentUser) {
        return (
            <div>
                <Navbar expand="md">
                    <NavLink to="/" className="navbar-brand">Movies</NavLink>
    
                    <Nav className="ml-auto" navbar>                  
                        <NavItem>
                            <NavLink to="/profile">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/" onClick={logout}>Log out {currentUser.username}</NavLink>
                        </NavItem>
                    </Nav>
                    <Form>
                        <Input 
                            type="search"
                            placeholder="Search"
                        />
                        <Button>Search</Button> 
                    </Form>
                </Navbar>
            </div>
        );
    }
    return (
        <div>
            <Navbar expand="md">
                <NavLink to="/" className="navbar-brand">Movies</NavLink>

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