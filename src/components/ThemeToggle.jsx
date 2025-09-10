
// Styles
import styled, { keyframes } from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import PropTypes from "prop-types";
// Icons
import { Icon } from "@iconify/react";

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const slideIn = keyframes`
  from { 
    opacity: 0;
    transform: translateX(-10px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
`;

// #region styled-components
const StyledToggleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 4rem;
  height: 2rem;
  background: ${({ theme }) =>
    theme.name === "light"
      ? "linear-gradient(135deg, #ffeaa7, #fab1a0)"
      : "linear-gradient(135deg, #2d3436, #636e72)"};
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid
    ${({ theme }) =>
      theme.name === "light"
        ? "rgba(255, 193, 7, 0.3)"
        : "rgba(116, 185, 255, 0.3)"};
  box-shadow: ${({ theme }) =>
    theme.name === "light"
      ? "0 4px 15px rgba(255, 193, 7, 0.2)"
      : "0 4px 15px rgba(116, 185, 255, 0.2)"};

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme }) =>
      theme.name === "light"
        ? "0 6px 20px rgba(255, 193, 7, 0.3)"
        : "0 6px 20px rgba(116, 185, 255, 0.3)"};
  }

  /* Hide default checkbox */
  input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  /* Slider */
  .slider {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 1.5rem;
    height: 1.5rem;
    background: white;
    border-radius: 50%;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

    .icon {
      animation: ${slideIn} 0.3s ease-out;
      color: ${({ theme }) => (theme.name === "light" ? "#f39c12" : "#74b9ff")};

      &:hover {
        animation: ${bounce} 0.6s ease-in-out;
      }
    }
  }

  /* Move slider when checked */
  input[type="checkbox"]:checked + .slider {
    transform: translateX(2rem);
    background: ${({ theme }) => (theme.name === "light" ? "#fff" : "#2d3436")};
  }

  /* Background animation */
  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "linear-gradient(45deg, #ffeaa7, #fab1a0, #fd79a8)"
        : "linear-gradient(45deg, #74b9ff, #0984e3, #6c5ce7)"};
    border-radius: 2rem;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.3;
    animation: ${rotate} 3s linear infinite;
  }

  /* Focus styles for accessibility */
  input[type="checkbox"]:focus + .slider {
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.name === "light"
          ? "rgba(255, 193, 7, 0.3)"
          : "rgba(116, 185, 255, 0.3)"};
  }
`;

const TooltipText = styled.span`
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) =>
    theme.name === "light" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)"};
  color: ${({ theme }) => (theme.name === "light" ? "white" : "black")};
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 1000;

  &::before {
    content: "";
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid
      ${({ theme }) =>
        theme.name === "light"
          ? "rgba(0, 0, 0, 0.8)"
          : "rgba(255, 255, 255, 0.9)"};
  }

  ${StyledSwitch}:hover & {
    opacity: 1;
  }
`;
// #endregion

// #region functions
const setStoredTheme = (theme) => localStorage.setItem("theme", theme);
// #endregion

// #region component
const propTypes = {
  closeDelay: PropTypes.number,
  setExpanded: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
};

const ThemeToggle = ({ closeDelay = 250, setExpanded, setTheme }) => {
  const theme = useSelector(selectMode);

  const toggleTheme = () => {
    const themType = theme === "light" ? "dark" : "light";
    setTheme(themType);
    setStoredTheme(themType);
  };

  const handleToggle = () => {
    toggleTheme();
    setTimeout(() => {
      setExpanded(false);
    }, closeDelay);
  };

  return (
    <StyledToggleContainer>
      <StyledSwitch theme={{ name: theme }}>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={handleToggle}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        />
        <div className="slider">
          <div className="icon">
            {theme === "light" ? (
              <Icon icon="ph:sun-bold" />
            ) : (
              <Icon icon="ph:moon-bold" />
            )}
          </div>
        </div>
        <TooltipText theme={{ name: theme }}>
          Switch to {theme === "light" ? "dark" : "light"} mode
        </TooltipText>
      </StyledSwitch>
    </StyledToggleContainer>
  );
};

ThemeToggle.propTypes = propTypes;
// #endregion

export default ThemeToggle;
