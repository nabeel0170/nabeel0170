// Styles
import styled, { keyframes } from "styled-components";
// State
import PropTypes from "prop-types";
// Icons
import { Icon } from "@iconify/react";
// Images
import Logo from "../images/developer-static.png";
import { Light, Dark } from "../config";
// Components
import { useErrorBoundary } from "react-error-boundary";
import { Link } from "react-scroll";
import { Button, Col, Container, Row } from "react-bootstrap";
import SocialLinks from "./SocialLinks";

// #region styled-components
const spin = keyframes`
 0% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  100% { transform: rotate(-10deg); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const typewriter = keyframes`
  0% { width: 0; }
  90% { width: 100%; }
  100% { width: 100%; }
`;

const blinkCursor = keyframes`
  0%, 50% { border-color: currentColor; }
  51%, 100% { border-color: transparent; }
`;

const removeCursor = keyframes`
  0% { border-right-width: 3px; }
  100% { border-right-width: 0; }
`;

const StyledHero = styled.header`
  position: relative;
  display: grid;
  place-items: center;
  max-width: 1920px;
  margin: 0 auto;
  min-height: calc(100vh - var(--nav-height));
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
        : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"};
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
    z-index: -2;
  }

  /* Overlay for better text contrast */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      theme.name === "light" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.4)"};
    backdrop-filter: blur(1px);
    z-index: -1;
  }

  .hero-content {
    animation: ${fadeInUp} 0.8s ease-out;

    .title {
      /* Override the gradient text for better readability in hero */
      background: none !important;
      -webkit-background-clip: unset !important;
      background-clip: unset !important;
      -webkit-text-fill-color: unset !important;
      color: white !important;
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
      font-weight: 700;

      /* Add a subtle glow effect */
      filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
    }
  }

  .hero-title {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    border-right: 3px solid white;
    animation:
      ${typewriter} 2s steps(20) 0.3s both,
      ${blinkCursor} 0.6s step-end 0s 3,
      ${removeCursor} 0.1s ease-out 2.5s both;

    @media (max-width: 768px) {
      white-space: normal;
      border-right: none;
      animation: ${fadeInUp} 1s ease-out;
    }

    @media (prefers-reduced-motion: reduce) {
      white-space: normal;
      border-right: none;
      animation: ${fadeInUp} 1s ease-out;
    }
  }

  .social-links {
    animation: ${fadeInUp} 0.8s ease-out 2.8s both;
  }

  .down-container {
    height: 10rem;
    animation: ${fadeInUp} 0.8s ease-out 3.2s both;
  }

  @media (prefers-reduced-motion: no-preference) {
    .hero-img {
      animation: ${spin} infinite 20s linear;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media screen and (min-width: 1180px) {
    &::before {
      background: ${({ theme }) =>
        theme.name === "light"
          ? `linear-gradient(135deg, rgba(102, 126, 234, 0.85), rgba(118, 75, 162, 0.85)), url(${Light}) top center fixed no-repeat`
          : `linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.9)), url(${Dark}) top center fixed no-repeat`};
      background-size:
        400% 400%,
        100vw auto;
      animation: gradientShift 8s ease infinite;
    }
  }

  @media screen and (min-width: 1367px) {
    &::before {
      background: ${({ theme }) =>
        theme.name === "light"
          ? `linear-gradient(135deg, rgba(102, 126, 234, 0.85), rgba(118, 75, 162, 0.85)), url(${Light}) center center fixed no-repeat`
          : `linear-gradient(135deg, rgba(26, 26, 46, 0.9), rgba(22, 33, 62, 0.9)), url(${Dark}) center center fixed no-repeat`};
      background-size:
        400% 400%,
        cover;
      animation: gradientShift 8s ease infinite;
    }
  }
`;
// #endregion

// #region component
const propTypes = {
  name: PropTypes.string,
};

const Hero = ({ name }) => {
  const { showBoundary } = useErrorBoundary();

  return (
    <StyledHero>
      <Container className="hero-content">
        <Row className="align-items-center text-center">
          <Col lg={6} className="order-2 order-lg-1">
            <h1 className="mb-4 display-3 title hero-title">
              {name === null ? "null" : name}
            </h1>
            <div className="d-flex align-items-center justify-content-center social-links">
              <SocialLinks />
            </div>
          </Col>
          <Col lg={6} className="order-1 order-lg-2 d-none d-md-block">
            <img
              src={Logo}
              alt="React Logo"
              className="w-75 mx-auto hero-img d-block"
            />
          </Col>
        </Row>
        <Row className="align-items-end down-container">
          <Col className="m-4 text-center">
            <Link to={"About"} className="link-icons">
              <Icon icon="fa6-solid:circle-chevron-down" />
            </Link>
          </Col>
        </Row>
        <Button
          className="d-none"
          onClick={() =>
            showBoundary({
              name: "Error",
              message: "Simulated error message",
            })
          }
        >
          Simulate Error Boundary
        </Button>
      </Container>
    </StyledHero>
  );
};

Hero.propTypes = propTypes;
// #endregion

export default Hero;
