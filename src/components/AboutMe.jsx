import React from "react";
// Styles
import styled, { keyframes } from "styled-components";
// State
import PropTypes from "prop-types";
// Components
import { Element } from "react-scroll";
import { Col, Container, Row } from "react-bootstrap";
import Title from "./Title";
import AnimatedSection from "./AnimatedSection";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(102, 126, 234, 0); }
  100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
`;

// #region styled-components
const StyledAboutMe = styled.section`
  .bio-text {
    font-size: 1.3rem;
    line-height: 1.8;
    color: ${({ theme }) =>
      theme.name === "light"
        ? "rgba(0, 0, 0, 0.8)"
        : "rgba(255, 255, 255, 0.9)"};
    background: ${({ theme }) =>
      theme.name === "light"
        ? "rgba(255, 255, 255, 0.9)"
        : "rgba(30, 30, 30, 0.9)"};
    backdrop-filter: blur(20px);
    border-radius: 1.5rem;
    padding: 2.5rem;
    border: 1px solid
      ${({ theme }) =>
        theme.name === "light"
          ? "rgba(102, 126, 234, 0.1)"
          : "rgba(240, 147, 251, 0.1)"};
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${({ theme }) =>
        theme.name === "light"
          ? "linear-gradient(135deg, rgba(102, 126, 234, 0.03), rgba(118, 75, 162, 0.03))"
          : "linear-gradient(135deg, rgba(240, 147, 251, 0.03), rgba(245, 87, 108, 0.03))"};
      z-index: -1;
    }
  }

  .profile-image {
    width: 16rem;
    height: 16rem;
    border-radius: 50%;
    border: 4px solid transparent;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box"
        : "linear-gradient(#1e1e1e, #1e1e1e) padding-box, linear-gradient(135deg, #f093fb, #f5576c) border-box"};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    &:hover {
      transform: scale(1.05);
      animation: ${pulse} 2s infinite;
    }

    @media (max-width: 768px) {
      width: 12rem;
      height: 12rem;
    }
  }

  @media (max-width: 768px) {
    .bio-text {
      font-size: 1.1rem;
      padding: 2rem;
    }
  }
`;
// #endregion

// #region component
const propTypes = {
  avatar_url: PropTypes.string.isRequired,
  bio: PropTypes.string,
  moreInfo: PropTypes.string,
};

const AboutMe = ({ avatar_url, bio, moreInfo }) => {
  return (
    <Element name={"About"} id="about">
      <StyledAboutMe className="section">
        <Container>
          <AnimatedSection>
            <Container className="d-flex justify-content-center">
              <Title size={"h2"} text={"About Me"} />
            </Container>
          </AnimatedSection>
          <Row className="align-items-center mt-5 g-4">
            <Col lg={8} className="order-2 order-lg-1">
              <AnimatedSection delay={0.2}>
                <div className="bio-text">
                  {bio && <p className="mb-0">{bio}</p>}
                </div>
              </AnimatedSection>
            </Col>
            <Col lg={4} className="order-1 order-lg-2 text-center">
              <AnimatedSection delay={0.4}>
                <img
                  src={avatar_url}
                  alt="GitHub Avatar"
                  loading="lazy"
                  className="profile-image mx-auto d-block"
                />
              </AnimatedSection>
            </Col>
          </Row>
        </Container>
      </StyledAboutMe>
    </Element>
  );
};

AboutMe.propTypes = propTypes;
// #endregion

export default AboutMe;
