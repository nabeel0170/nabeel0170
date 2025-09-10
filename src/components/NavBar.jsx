import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import PropTypes from "prop-types";
// Router
import { Link, useLocation } from "react-router-dom";

// Components
import { Link as ScrollLink } from "react-scroll";
import { Container, Nav, Navbar } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import { useGetUsersQuery } from "../app/apiSlice";

// #region constants
const navLinks = {
  routes: [
    { id: "1R", name: "Home", route: "/" },
    { id: "2R", name: "All Projects", route: "/All-Projects" },
  ],
  to: [
    { id: "1T", name: "Home", to: "Home" },
    { id: "2T", name: "About Me", to: "About" },
    { id: "3T", name: "Skills", to: "Skills" },
    { id: "4T", name: "Projects", to: "Projects" },
    { id: "5T", name: "Contact", to: "Contact" },
  ],
};
// #endregion

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// #region styled-components
const StyledDiv = styled.div`
  .navbar {
    background: ${({ theme, $isScrolled }) =>
      $isScrolled
        ? theme.name === "light"
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(30, 30, 30, 0.95)"
        : theme.name === "light"
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(30, 30, 30, 0.9)"} !important;
    backdrop-filter: blur(20px);
    border-bottom: 1px solid
      ${({ theme }) =>
        theme.name === "light"
          ? "rgba(102, 126, 234, 0.1)"
          : "rgba(240, 147, 251, 0.1)"};
    box-shadow: ${({ $isScrolled }) =>
      $isScrolled
        ? "0 8px 32px rgba(0, 0, 0, 0.15)"
        : "0 4px 20px rgba(0, 0, 0, 0.1)"};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: ${slideDown} 0.4s ease-out;

    .navbar-brand {
      font-weight: 700;
      font-size: 1.5rem;
      background: ${({ theme }) =>
        theme.name === "light"
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"};
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }

    .navbar-toggler {
      border: none;
      padding: 0.75rem;
      border-radius: 1rem;
      background: ${({ theme }) =>
        theme.name === "light"
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(30, 30, 30, 0.9)"};
      backdrop-filter: blur(10px);
      border: 2px solid ${({ theme }) =>
        theme.name === "light"
          ? "rgba(102, 126, 234, 0.2)"
          : "rgba(240, 147, 251, 0.2)"};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: ${({ theme }) =>
          theme.name === "light"
            ? "linear-gradient(135deg, #667eea, #764ba2)"
            : "linear-gradient(135deg, #f093fb, #f5576c)"};
        transition: left 0.3s ease;
        z-index: -1;
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px ${({ theme }) =>
          theme.name === "light"
            ? "rgba(102, 126, 234, 0.3)"
            : "rgba(240, 147, 251, 0.3)"};
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px ${({ theme }) =>
          theme.name === "light"
            ? "rgba(102, 126, 234, 0.2)"
            : "rgba(240, 147, 251, 0.2)"};
        border-color: ${({ theme }) =>
          theme.name === "light" ? "#667eea" : "#f093fb"};

        &::before {
          left: 0;
        }

        .hamburger-line {
          background: white;
        }
      }

      &[aria-expanded="true"] {
        .hamburger-line {
          &:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
          }
          
          &:nth-child(2) {
            opacity: 0;
            transform: translateX(-20px);
          }
          
          &:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
          }
        }
      }
    }

    .hamburger-container {
      width: 24px;
      height: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }

    .hamburger-line {
      width: 100%;
      height: 2px;
      background: ${({ theme }) =>
        theme.name === "light" ? "#667eea" : "#f093fb"};
      border-radius: 2px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
      position: relative;
    }

    .navbar-collapse {
      animation: ${fadeIn} 0.3s ease-out;
    }
  }

  .spacer {
    height: var(--nav-height);
  }

  .nav-link {
    position: relative;
    font-weight: 500;
    padding: 0.75rem 1.25rem !important;
    margin: 0 0.25rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: ${({ theme }) =>
      theme.name === "light"
        ? "rgba(0, 0, 0, 0.7)"
        : "rgba(255, 255, 255, 0.8)"} !important;
    border-radius: 0.5rem;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background: ${({ theme }) =>
        theme.name === "light"
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"};
      transform: translateX(-50%);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 2px;
    }

    &:hover {
      color: ${({ theme }) =>
        theme.name === "light" ? "#667eea" : "#f093fb"} !important;
      background: ${({ theme }) =>
        theme.name === "light"
          ? "rgba(102, 126, 234, 0.05)"
          : "rgba(240, 147, 251, 0.05)"};
      transform: translateY(-1px);

      &::after {
        width: 80%;
      }
    }

    &.active {
      color: ${({ theme }) =>
        theme.name === "light" ? "#667eea" : "#f093fb"} !important;
      font-weight: 600;

      &::after {
        width: 80%;
      }
    }
  }

  .logo-img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
    border: 2px solid
      ${({ theme }) =>
        theme.name === "light"
          ? "rgba(102, 126, 234, 0.2)"
          : "rgba(240, 147, 251, 0.2)"};

    &:hover {
      transform: scale(1.1) rotate(5deg);
      border-color: ${({ theme }) =>
        theme.name === "light" ? "#667eea" : "#f093fb"};
    }
  }

  @media (max-width: 1199px) {
    .navbar-collapse {
      background: ${({ theme }) =>
        theme.name === "light"
          ? "rgba(255, 255, 255, 0.98)"
          : "rgba(30, 30, 30, 0.98)"};
      backdrop-filter: blur(20px);
      border-radius: 1rem;
      margin-top: 1rem;
      padding: 1rem;
      border: 1px solid
        ${({ theme }) =>
          theme.name === "light"
            ? "rgba(102, 126, 234, 0.1)"
            : "rgba(240, 147, 251, 0.1)"};
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .nav-link {
      margin: 0.25rem 0;
      padding: 1rem 1.25rem !important;
      font-size: 1.1rem;
      text-align: center;

      &::after {
        display: none; /* Hide underline on mobile */
      }

      &:hover,
      &.active {
        background: ${({ theme }) =>
          theme.name === "light"
            ? "rgba(102, 126, 234, 0.1)"
            : "rgba(240, 147, 251, 0.1)"};
        border-radius: 0.75rem;
      }
    }
  }

  @media (max-width: 575px) {
    .navbar-brand {
      font-size: 1.25rem;
    }

    .navbar-collapse {
      margin-top: 0.75rem;
      padding: 0.75rem;
    }

    .nav-link {
      padding: 0.75rem 1rem !important;
      font-size: 1rem;
    }
  }
`;
// #endregion

// #region component
const propTypes = {
  callBack: PropTypes.func,
  closeDelay: PropTypes.number,
};

const NavBar = ({ callBack, closeDelay = 125 }) => {
  const theme = useSelector(selectMode);
  const [isExpanded, setisExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const { data: userData } = useGetUsersQuery();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <StyledDiv theme={{ name: theme }} $isScrolled={isScrolled}>
      <div className="spacer" />
      <Navbar
        id="nav"
        collapseOnSelect={true}
        expand="xl"
        expanded={isExpanded}
        fixed="top"
      >
        <Container>
          <Navbar.Brand 
            href={userData?.html_url || "https://github.com"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{userData?.name || "Portfolio"}</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            aria-expanded={isExpanded}
            onClick={() => setisExpanded(!isExpanded)}
          >
            <div className="hamburger-container">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </Navbar.Toggle>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav navbarScroll className="me-auto">
              {pathname === "/"
                ? navLinks.to.map((el, index) => {
                    return (
                      <Nav.Item
                        key={el.id}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <ScrollLink
                          to={el.to}
                          spy={true}
                          activeClass="active"
                          className="nav-link"
                          smooth={true}
                          duration={500}
                          onClick={() => {
                            setTimeout(() => {
                              setisExpanded(false);
                            }, closeDelay);
                          }}
                        >
                          {el.name}
                        </ScrollLink>
                      </Nav.Item>
                    );
                  })
                : navLinks.routes.map((el, index) => {
                    return (
                      <Nav.Item
                        key={el.id}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <Link
                          to={el.route}
                          className={
                            pathname === el.route
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={() => {
                            setTimeout(() => {
                              setisExpanded(false);
                            }, closeDelay);
                          }}
                        >
                          {el.name}
                        </Link>
                      </Nav.Item>
                    );
                  })}
            </Nav>
            <Nav>
              <ThemeToggle
                closeDelay={closeDelay}
                setExpanded={setisExpanded}
                setTheme={callBack}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </StyledDiv>
  );
};

NavBar.propTypes = propTypes;
// #endregion

export default NavBar;
