import React from "react";
import styled, { keyframes } from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
// Components
import { Element } from "react-scroll";
import { Button, Col, Container, Row } from "react-bootstrap";
import Title from "./Title";
import AnimatedSection from "./AnimatedSection";
// Config
import { skillData, resume } from "../config";

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const StyledSkillCard = styled.div`
  background: ${({ theme }) =>
    theme.name === "light"
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(30, 30, 30, 0.9)"};
  backdrop-filter: blur(20px);
  border: 1px solid
    ${({ theme }) =>
      theme.name === "light"
        ? "rgba(102, 126, 234, 0.2)"
        : "rgba(240, 147, 251, 0.2)"};
  border-radius: 1.5rem;
  padding: 2rem 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  /* Ensure consistent height */
  height: 100%;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))"
        : "linear-gradient(135deg, rgba(240, 147, 251, 0.05), rgba(245, 87, 108, 0.05))"};
    z-index: -1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: ${({ theme }) =>
      theme.name === "light"
        ? "0 20px 40px rgba(102, 126, 234, 0.15)"
        : "0 20px 40px rgba(240, 147, 251, 0.15)"};

    .skill-icon {
      animation: ${float} 2s ease-in-out infinite;
    }
  }

  .skill-icon {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .skill-name {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    min-height: 150px;

    .skill-icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }

    .skill-name {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    min-height: 130px;
    padding: 1.25rem 0.75rem;

    .skill-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .skill-name {
      font-size: 0.9rem;
    }
  }
`;

// #region component
const Skills = () => {
  const theme = useSelector(selectMode);

  return (
    <Element name={"Skills"} id="skills">
      <section className="section">
        <Container className="text-center">
          <AnimatedSection>
            <Container className="d-flex justify-content-center">
              <Title size={"h2"} text={"Skills"} />
            </Container>
          </AnimatedSection>
          <Row className="mt-5 g-4">
            {skillData.map((skills, index) => {
              return (
                <Col xs={6} md={4} lg={3} key={skills.id}>
                  <AnimatedSection delay={index * 0.05}>
                    <StyledSkillCard className="h-100 text-center">
                      <div className="skill-icon">{skills.skill}</div>
                      <p className="skill-name">{skills.name}</p>
                    </StyledSkillCard>
                  </AnimatedSection>
                </Col>
              );
            })}
          </Row>
          {resume && (
            <AnimatedSection delay={0.5}>
              <a href={resume}>
                <Button
                  size="lg"
                  variant={
                    theme === "light" ? "outline-primary" : "outline-light"
                  }
                  className="mt-5"
                >
                  R&eacute;sum&eacute;
                </Button>
              </a>
            </AnimatedSection>
          )}
        </Container>
      </section>
    </Element>
  );
};
// #endregion

export default Skills;
