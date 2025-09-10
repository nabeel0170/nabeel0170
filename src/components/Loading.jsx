// Styles
import styled, { keyframes } from "styled-components";

// #region styled-components
const spin = keyframes`
    to {
        transform: rotate(360deg)
    }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Loading = styled.div`
  display: inline-block;
  width: 5rem;
  height: 5rem;
  border: 4px solid transparent;
  border-radius: 50%;
  background: ${({ theme }) =>
    theme.name === "light"
      ? "linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box"
      : "linear-gradient(#1e1e1e, #1e1e1e) padding-box, linear-gradient(135deg, #f093fb, #f5576c) border-box"};
  margin: 1rem auto;
  animation: ${spin} 1s linear infinite;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "linear-gradient(135deg, #667eea, #764ba2)"
        : "linear-gradient(135deg, #f093fb, #f5576c)"};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${pulse} 1.5s ease-in-out infinite;
  }
`;

const LoadingText = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) =>
    theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"};
  margin: 0;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingComponent = () => (
  <LoadingContainer>
    <Loading />
    <LoadingText>Loading amazing content...</LoadingText>
  </LoadingContainer>
);
// #endregion

export default LoadingComponent;
