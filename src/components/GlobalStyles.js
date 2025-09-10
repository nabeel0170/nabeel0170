import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/*
=============== 
Variables
===============
*/
:root {
 --border: 1px solid #f093fb;
  --transition: all 0.3s linear;
  --nav-height: 55px;
  --min-footer-height: 11vh;
  --card-height: 28rem;
  
  /* Modern Purple Gradient Variables */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-accent: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
  --glassmorphism-light: rgba(255, 255, 255, 0.1);
  --glassmorphism-dark: rgba(0, 0, 0, 0.1);
  
  /* Mobile-first responsive variables */
  --mobile-padding: 1rem;
  --tablet-padding: 2rem;
  --desktop-padding: 3rem;
}

/* Mobile-first responsive breakpoints */
@media (max-width: 576px) {
  :root {
    --nav-height: 50px;
    --card-height: 24rem;
  }
}

/*
=============== 
Global Styles
===============
*/
main {
  min-height: calc(100vh - 2 * var(--nav-height) - 2rem);
}

section {
  margin: 1rem 0;
}

.section {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: var(--nav-height) var(--mobile-padding);
  
  @media (min-width: 768px) {
    padding: var(--nav-height) var(--tablet-padding);
  }
  
  @media (min-width: 1200px) {
    padding: var(--nav-height) var(--desktop-padding);
  }
}

a:hover {
  cursor: pointer;
}

.title {
  font-family: "Permanent Marker";
  background: ${({ theme }) =>
    theme.name === "light"
      ? "var(--gradient-primary)"
      : "var(--gradient-secondary)"};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.2;
  text-align: center;
  
  @media (max-width: 576px) {
    font-size: clamp(1.5rem, 8vw, 2.5rem);
  }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.link-icons {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 1.8rem;
  margin: 0 0.5rem;
  color: ${({ theme }) =>
    theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border-radius: 50%;
  text-decoration: none;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "var(--gradient-primary)"
        : "var(--gradient-secondary)"};
    border-radius: 50%;
    transform: scale(0);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-2px);
    color: white !important;
    text-decoration: none;
    
    &::after {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* Ensure icons are properly centered */
  svg {
    display: block;
    margin: auto;
  }
  
  /* Mobile responsive sizing */
  @media (min-width: 576px) {
    width: 55px;
    height: 55px;
    font-size: 2rem;
    margin: 0 0.6rem;
  }
  
  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 2.25rem;
    margin: 0 0.75rem;
    
    &:hover {
      transform: translateY(-3px);
    }
  }
}

.page-item.active .page-link {
  background: var(--gradient-primary);
  border: none;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.page-link {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: var(--glassmorphism-light);
    backdrop-filter: blur(10px);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
}

/* Modern Form Styling */
.form-control, .form-select {
  background: ${({ theme }) =>
    theme.name === "light"
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(30, 30, 30, 0.9)"};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) =>
    theme.name === "light"
      ? "rgba(102, 126, 234, 0.2)"
      : "rgba(240, 147, 251, 0.2)"};
  border-radius: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:focus {
    box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.25);
    border-color: var(--bs-primary);
    background: ${({ theme }) =>
      theme.name === "light"
        ? "rgba(255, 255, 255, 0.95)"
        : "rgba(30, 30, 30, 0.95)"};
  }
}

/* Modern Button Styling */
.btn-primary {
  background: var(--gradient-primary);
  border: none;
  border-radius: 2rem;
  padding: 0.6rem 1.5rem;
  font-weight: 500;
  font-size: 0.9rem;
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
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  @media (min-width: 576px) {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
  }
}

.btn-outline-primary {
  border: 2px solid var(--bs-primary);
  border-radius: 2rem;
  padding: 0.6rem 1.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  
  &:hover {
    background: var(--gradient-primary);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  }
  
  @media (min-width: 576px) {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
  }
}

/* Modern Gradient Border Utility */
.gradient-border {
  position: relative;
  background: ${({ theme }) =>
    theme.name === "light"
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(30, 30, 30, 0.9)"};
  border-radius: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    background: var(--gradient-primary);
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
  }
}
.card {
  background: ${({ theme }) =>
    theme.name === "light"
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(30, 30, 30, 0.9)"};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) =>
    theme.name === "light"
      ? "rgba(255, 255, 255, 0.2)"
      : "rgba(255, 255, 255, 0.1)"};
  border-radius: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Navbar Modern Touch */
.navbar {
  background: ${({ theme }) =>
    theme.name === "light"
      ? "rgba(255, 255, 255, 0.95)"
      : "rgba(30, 30, 30, 0.95)"} !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) =>
    theme.name === "light"
      ? "rgba(102, 126, 234, 0.1)"
      : "rgba(240, 147, 251, 0.1)"};
}

/* Enhanced Mobile Responsiveness */
@media (max-width: 575px) {
  .section {
    min-height: auto;
    padding: 2rem var(--mobile-padding);
  }
  
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .display-1, .display-2, .display-3, .display-4 {
    font-size: clamp(2rem, 8vw, 3rem) !important;
  }
  
  .card {
    margin-bottom: 1.5rem;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 1rem;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .section {
    padding: 3rem var(--mobile-padding);
  }
  
  .display-1, .display-2, .display-3, .display-4 {
    font-size: clamp(2.5rem, 6vw, 3.5rem) !important;
  }
}

@media (min-width: 768px) {
  .form-group {
    max-width: 750px;
  }
  
  .section {
    padding: var(--nav-height) var(--tablet-padding);
  }
}

@media (min-width: 992px) {
  .link-icons {
    font-size: 2.5rem;
    width: 65px;
    height: 65px;
  }
}

@media (min-width: 1200px) {
  .section {
    padding: var(--nav-height) var(--desktop-padding);
  }
}

/* Touch-friendly interactions for mobile */
@media (hover: none) and (pointer: coarse) {
  .link-icons:active {
    transform: scale(0.95);
    
    &::after {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .btn:active {
    transform: scale(0.98);
  }
  
  .card:active {
    transform: scale(0.98);
  }
}
`;

export default GlobalStyles;
