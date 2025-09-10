import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => props.progress}%;
  height: 4px;
  background: ${({ theme }) =>
    theme.name === "light"
      ? "linear-gradient(90deg, #667eea, #764ba2)"
      : "linear-gradient(90deg, #f093fb, #f5576c)"};
  z-index: 9999;
  transition: width 0.1s ease-out;
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
`;

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return <ProgressBar progress={progress} />;
};

export default ScrollProgress;
