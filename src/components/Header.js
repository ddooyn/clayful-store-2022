import React, { useContext, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import logo from "../images/icons/logo-sm.png";
import cart from "../images/icons/cart-sm.png";
import "./Header.scss";

import { AuthContext } from "../context/AuthContext";

function Header() {
  const { isAuth, isAuthenticated, signOut } = useContext(AuthContext);
  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);

  return (
    <header className="nav-wrapper fixed-top navbar navbar-toggleable-sm navbar-expand-md">
      <div className="container">
        <Navbar className="w-100" collapseOnSelect expand="lg" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand href="/">
            <img src={logo} alt="" />
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-justified w-100 nav-fill">
              <Nav.Link href="/">iphone</Nav.Link>
              {isAuth ? (
                <>
                  <Nav.Link onClick={signOut}>Logout</Nav.Link>
                  <Nav.Link href="/user/cart">
                    <img src={cart} alt="cart" />
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/login">
                    <img src={cart} alt="cart" />
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
}

export default Header;
