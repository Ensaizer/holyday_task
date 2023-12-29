import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useAuth from '../../customHooks/useAuth';

export default function NavBar({ user }) {
  const { logoutHandler } = useAuth();
  return (
    <Navbar>
      <Container>
        <Nav className="me-auto flex-grow-1">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Nav className="me-auto flex-grow-0">
          {user ? (
            <>
              <Nav.Link onClick={logoutHandler} href="#">
                logout
              </Nav.Link>
              <Nav.Link href="/my_page">My page</Nav.Link>
              <Nav.Link href="/friends">Friends</Nav.Link>
              <Nav.Link href="/chats">Chats</Nav.Link>
              <Nav.Link href="/photos">Photos</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/account/login">Login</Nav.Link>
              <Nav.Link href="/account/signup">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
