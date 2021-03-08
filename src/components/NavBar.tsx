import React from "react";
import styled from "styled-components";

const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 18px 20px 12px;
  align-items: center;
  margin: 25px 40px;

  nav {
    display: flex;
    align-items: center;
  }
  .logo {
    position: absolute;
    width: 100%;
    left: 0;
    top: -27px;
    display: inline-block;
  }
  .logo-container {
    width: 170px;
    margin-right: 50px;
    position: relative;
  }
  .cart {
    width: 25px;
    position: relative;
  }
`;
const StyledNavItem = styled.a`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: #2b2e2b;
  color: #000;
  margin-right: 20px;
  padding: 5px 10px;
  text-decoration: none;
  button {
    background: transparent;
    border: 0;
  }
  button:focus {
    outline: 0 !important;
  }
`;
const StyledNavButton = styled.button`
  font-size: 14px;
  line-height: 17px;
  letter-spacing: #2b2e2b;
  color: #000;
  margin-right: 20px;
  padding: 5px 10px;
  text-decoration: none;
  background: transparent;
  border: 0;

  :focus {
    outline: 0 !important;
  }
  .count {
    color: #1e2d2b;
    position: absolute;
    top: 40px;
    right: 75px;
    width: 12px;
    height: 12px;
    text-align: center;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
  }
`;
const NavBar = ({ count, handleOpen }) => {
  return (
    <StyledNav className="d-none d-md-flex">
      <nav>
        <a href="https://luminskin.com" className="logo-container">
          <img
            src="assets/logo.png"
            alt="Luminskin Logo"
            width="170"
            className="logo"
          />
        </a>
        <StyledNavItem href="/">Shop</StyledNavItem>
        <StyledNavItem href="#">Learn</StyledNavItem>
      </nav>
      <nav>
        <StyledNavItem href="#">Account</StyledNavItem>
        <StyledNavButton onClick={handleOpen}>
          <img src="assets/cart.png" alt="Cart" className="cart" />
          <span className="count">{count}</span>
        </StyledNavButton>
      </nav>
    </StyledNav>
  );
};

export default NavBar;
