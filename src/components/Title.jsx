import React from "react";
// Styles
import styled from "styled-components";
// State
import PropTypes from "prop-types";

// #region styled-components
const TitleDiv = styled.div`
  display: inline-block;
  max-width: 90vw;
  word-wrap: break-word;
  margin: 0.5rem 0;

  .underline {
    height: 0.25rem;
    width: 75%;
    min-width: 3rem;
    border-radius: 0.25rem;
    margin: 0 auto 0 auto;
    background: var(--gradient-accent);
  }
`;
// #endregion

// #region component
const propTypes = {
  size: PropTypes.oneOf(["h1", "h2"]),
  text: PropTypes.string.isRequired,
};

const Title = ({ size = "h1", text }) => {
  return (
    <TitleDiv>
      {size === "h1" ? (
        <h1 className="title">{text}</h1>
      ) : (
        <h2 className="title">{text}</h2>
      )}
      <div className="underline" />
    </TitleDiv>
  );
};

Title.propTypes = propTypes;
// #endregion

export default Title;
