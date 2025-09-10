import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledAnimatedSection = styled.div`
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.$isVisible ? "0" : "20px")});
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${(props) => props.$delay || "0s"};
`;

const AnimatedSection = ({
  children,
  delay = 0,
  threshold = 0.1,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    // Reduce motion on mobile or if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: isMobile ? 0.05 : threshold,
        rootMargin: isMobile ? "50px" : "0px",
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <StyledAnimatedSection
      ref={ref}
      $isVisible={isVisible}
      $delay={`${delay}s`}
      className={className}
    >
      {children}
    </StyledAnimatedSection>
  );
};

export default AnimatedSection;
