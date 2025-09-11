import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import GH from "../images/GH.svg";
import { Card } from "react-bootstrap";

const StyledCard = styled.div`
  .card {
    height: var(--card-height);
    border: none;
    border-radius: 1.5rem;
    padding: 0;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "rgba(255, 255, 255, 0.9)"
        : "rgba(30, 30, 30, 0.9)"};
    backdrop-filter: blur(20px);
    box-shadow: ${({ theme }) =>
      theme.name === "light"
        ? "0 8px 32px rgba(0, 0, 0, 0.1)"
        : "0 8px 32px rgba(0, 0, 0, 0.3)"};
    border: ${({ theme }) =>
      theme.name === "light"
        ? "1px solid rgba(255, 255, 255, 0.2)"
        : "1px solid rgba(255, 255, 255, 0.1)"};
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      transition: left 0.6s;
      z-index: 1;
    }

    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: ${({ theme }) =>
        theme.name === "light"
          ? "0 20px 40px rgba(0, 0, 0, 0.15)"
          : "0 20px 40px rgba(0, 0, 0, 0.4)"};

      &::before {
        left: 100%;
      }
    }

    .card-img-top {
      height: 180px;
      object-fit: contain;
      padding: 2rem;
      transition: all 0.3s ease;
      filter: ${({ theme }) =>
        theme.name === "light" ? "none" : "brightness(0.9)"};
      position: relative;
      z-index: 2;

      &:hover {
        transform: scale(1.05);
      }
    }

    .card-body {
      padding: 1.5rem;
      position: relative;
      z-index: 2;
      background: ${({ theme }) =>
        theme.name === "light"
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(255, 255, 255, 0.05)"};

      .card-title {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: ${({ theme }) =>
          theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"};
        background: ${({ theme }) =>
          theme.name === "light"
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"};
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
      }

      .card-text {
        font-size: 0.95rem;
        line-height: 1.6;
        color: ${({ theme }) =>
          theme.name === "light"
            ? "rgba(0, 0, 0, 0.7)"
            : "rgba(255, 255, 255, 0.8)"};
        text-align: center;
        margin-bottom: 0;
      }
    }

    .card-footer {
      border: none;
      border-radius: 0 0 1.5rem 1.5rem;
      background: ${({ theme }) =>
        theme.name === "light"
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(0, 0, 0, 0.3)"};
      padding: 1.25rem;
      position: relative;
      z-index: 2;

      .card-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none !important;
        font-size: 1rem;
        font-weight: 500;
        padding: 0.75rem 1.5rem;
        border-radius: 2rem;
        background: ${({ theme }) =>
          theme.name === "light"
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"} !important;
        color: white !important;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        border: none;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s;
        }

        &:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2) !important;
          color: white !important;
          text-decoration: none !important;
          background: ${({ theme }) =>
            theme.name === "light"
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"} !important;

          &::before {
            left: 100%;
          }
        }

        &:focus, &:active, &:visited {
          color: white !important;
          text-decoration: none !important;
          background: ${({ theme }) =>
            theme.name === "light"
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"} !important;
        }

        svg {
          transition: transform 0.3s ease;
        }

        &:hover svg {
          transform: scale(1.2);
        }
      }
    }

    @media (max-width: 768px) {
      .card-img-top {
        height: 140px;
        padding: 1.5rem;
      }

      .card-body {
        padding: 1.25rem;

        .card-title {
          font-size: 1.25rem;
        }

        .card-text {
          font-size: 0.9rem;
        }
      }

      .card-footer {
        padding: 1rem;

        .card-link {
          padding: 0.65rem 1.25rem;
          font-size: 0.9rem;
          background: ${({ theme }) =>
            theme.name === "light"
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"} !important;
          color: white !important;
          
          &:hover, &:focus, &:active {
            background: ${({ theme }) =>
              theme.name === "light"
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"} !important;
            color: white !important;
          }
        }
      }
    }
  }
`;

const propTypes = {
  demo: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.node,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const ProjectCard = ({ demo, description, image, name, url }) => {
  return (
    <StyledCard>
      <Card>
        <Card.Img
          variant="top"
          src={image ? image : GH}
          alt={name}
          className="mx-auto"
        />
        <Card.Body className="overflow-auto text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description ||
              "A detailed project showcasing full-stack development skills and practical implementation."}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
          <Card.Link href={url}>
            View on GitHub
            <Icon icon="icomoon-free:github" />
          </Card.Link>
        </Card.Footer>
      </Card>
    </StyledCard>
  );
};

ProjectCard.propTypes = propTypes;

export default ProjectCard;
