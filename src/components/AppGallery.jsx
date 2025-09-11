import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
// Components
import { Element } from "react-scroll";
import { Container } from "react-bootstrap";
import Title from "./Title";
import AnimatedSection from "./AnimatedSection";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledSlider = styled.section`
  .slider-container {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 2rem;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(30, 30, 30, 0.1)"};
    backdrop-filter: blur(20px);
    border: 1px solid
      ${({ theme }) =>
        theme.name === "light"
          ? "rgba(102, 126, 234, 0.2)"
          : "rgba(240, 147, 251, 0.2)"};
    box-shadow: ${({ theme }) =>
      theme.name === "light"
        ? "0 20px 60px rgba(102, 126, 234, 0.15)"
        : "0 20px 60px rgba(240, 147, 251, 0.15)"};
  }

  .slider-track {
    display: flex;
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
    height: 600px;
  }

  .slide {
    flex: 0 0 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
        : "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)"};

    .slide-image {
      transition: transform 0.3s ease;
      animation: ${fadeIn} 0.8s ease-out;

      &:hover {
        transform: scale(1.02);
      }

      /* Web App Styling */
      &.web-app {
        width: 90%;
        height: 90%;
        object-fit: contain;
        border-radius: 1rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      }

      /* Mobile App Styling - Phone Frame */
      &.mobile-app {
        width: auto;
        height: 95%;
        max-width: 450px;
        object-fit: cover;
        border-radius: 2.5rem;
        padding: 0.4rem 0.25rem;
        background: #1a1a1a;
        box-shadow:
          0 0 0 8px #1a1a1a,
          0 0 0 10px #333,
          0 30px 60px rgba(0, 0, 0, 0.5);
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: 0.15rem;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 3px;
          background: #666;
          border-radius: 2px;
          z-index: 1;
        }

        &::after {
          content: "";
          position: absolute;
          bottom: 0.15rem;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          border: 2px solid #666;
          border-radius: 50%;
          z-index: 1;
        }
      }
    }

    .slide-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
      padding: 2rem;
      color: white;
      transform: translateY(100%);
      transition: transform 0.3s ease;

      .slide-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .slide-description {
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 1rem;
        opacity: 0.9;
      }

      .slide-type {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.9rem;
        font-weight: 500;
        background: ${({ theme }) =>
          theme.name === "light"
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"};
      }
    }

    &:hover .slide-overlay {
      transform: translateY(0);
    }
  }

  .slider-indicators {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 10;
  }

  .indicator-dots {
    display: flex;
    gap: 0.5rem;
  }

  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: white;
      transform: scale(1.3);
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
    }

    &:hover {
      background: rgba(255, 255, 255, 0.7);
      transform: scale(1.1);
    }
  }

  .slide-counter {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    min-width: 60px;
  }

  .slider-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: ${({ theme }) => (theme.name === "light" ? "#333" : "#fff")};
    font-size: 2.5rem;
    font-weight: bold;
    z-index: 10;
    opacity: 0.8;
    text-shadow: ${({ theme }) =>
      theme.name === "light"
        ? "0 2px 4px rgba(0, 0, 0, 0.3)"
        : "0 2px 4px rgba(0, 0, 0, 0.5)"};

    &:hover {
      opacity: 1;
      transform: translateY(-50%) scale(1.2);
      color: ${({ theme }) => (theme.name === "light" ? "#667eea" : "#f093fb")};
    }

    &.prev {
      left: 1.5rem;
    }

    &.next {
      right: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .slider-container {
      margin: 0 1rem;
    }

    .slider-track {
      height: 450px;
    }

    .slide-overlay {
      padding: 1.5rem;

      .slide-title {
        font-size: 1.3rem;
      }

      .slide-description {
        font-size: 0.9rem;
        margin-bottom: 0.8rem;
      }
    }

    .slide-image {
      &.mobile-app {
        max-width: 300px;
        height: 90%;
      }

      &.web-app {
        width: 95%;
        height: 85%;
      }
    }

    .slider-nav {
      width: 45px;
      height: 45px;
      font-size: 2.2rem;

      &.prev {
        left: 1rem;
      }

      &.next {
        right: 1rem;
      }
    }

    .slide-counter {
      font-size: 0.8rem;
      padding: 0.4rem 0.8rem;
      min-width: 55px;
    }
  }

  @media (max-width: 480px) {
    .slider-container {
      margin: 0 0.5rem;
    }

    .slider-track {
      height: 350px;
    }

    .slider-indicators {
      bottom: 1rem;
      gap: 0.75rem;
    }

    .indicator {
      width: 8px;
      height: 8px;
    }

    .slide-image {
      &.mobile-app {
        max-width: 250px;
        height: 85%;
      }

      &.web-app {
        width: 98%;
        height: 80%;
      }
    }

    .slider-nav {
      width: 40px;
      height: 40px;
      font-size: 2rem;

      &.prev {
        left: 0.5rem;
      }

      &.next {
        right: 0.5rem;
      }
    }

    .slide-counter {
      font-size: 0.75rem;
      padding: 0.3rem 0.6rem;
      min-width: 50px;
    }
  }
`;

// Gallery images configuration
const galleryImages = [
  {
    id: 1,
    title: "Cafe Landing Page",
    type: "Web App",
    description:
      "Modern and responsive cafe website with elegant design, featuring menu showcase, location details, and online ordering capabilities.",
    image: `${process.env.PUBLIC_URL}/images/gallery/cafe-1.png`,
  },
  {
    id: 2,
    title: "Cafe Landing Page",
    type: "Web App",
    image: `${process.env.PUBLIC_URL}/images/gallery/cafe-2.png`,
  },
  {
    id: 3,
    title: "Cafe Landing Page",
    type: "Web App",
    image: `${process.env.PUBLIC_URL}/images/gallery/cafe-3.png`,
  },
  {
    id: 4,
    title: "Cafe Landing Page",
    type: "Web App",
    image: `${process.env.PUBLIC_URL}/images/gallery/cafe-4.png`,
  },
  {
    id: 5,
    title: "Food Delivery App",
    type: "Mobile App",
    description:
      "Food delivery mobile app with restaurant browsing, menu selection, cart management, and real-time order tracking.",
    image: `${process.env.PUBLIC_URL}/images/gallery/food-delivery-mobile.png`,
  },
  {
    id: 6,
    title: "Food Delivery App",
    type: "Mobile App",
    description:
      "Intuitive user interface for food ordering with category filters, search functionality, favorites, and seamless checkout process.",
    image: `${process.env.PUBLIC_URL}/images/gallery/food-delivery-mobile-2.png`,
  },
  {
    id: 7,
    title: "KSM - Kitchen Stock Management",
    type: "Web App",
    description:
      "Comprehensive kitchen management system with user management, order processing, ingredient tracking, menu management, and integrated POS system.",
    image: `${process.env.PUBLIC_URL}/images/gallery/ksm-1.png`,
  },
  {
    id: 8,
    title: "KSM Dashboard & Analytics",
    type: "Web App",
    description:
      "Advanced dashboard with automated ingredient management that updates stock levels in real-time when items are sold through the POS system.",
    image: `${process.env.PUBLIC_URL}/images/gallery/ksm-2.png`,
  },
];

const AppGallery = () => {
  const theme = useSelector(selectMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide functionality with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= galleryImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= galleryImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? galleryImages.length - 1 : prevIndex - 1,
    );
  };

  const translateX = -currentIndex * 100;

  return (
    <Element name={"Gallery"} id="gallery">
      <section className="section">
        <Container>
          <AnimatedSection>
            <Container className="d-flex justify-content-center">
              <Title size={"h2"} text={"App Gallery"} />
            </Container>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <StyledSlider theme={{ name: theme }}>
              <div
                className="slider-container"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div
                  className="slider-track"
                  style={{ transform: `translateX(${translateX}%)` }}
                >
                  {galleryImages.map((image) => (
                    <div key={image.id} className="slide">
                      <img
                        src={image.image}
                        alt={image.title}
                        className={`slide-image ${image.type === "Mobile App" ? "mobile-app" : "web-app"}`}
                        onError={(e) => {
                          // Fallback to a placeholder if image doesn't exist
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjY3ZWVhO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6Izc2NGJhMjtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BcHAgU2NyZWVuc2hvdDwvdGV4dD48L3N2Zz4=";
                        }}
                      />
                      <div className="slide-overlay">
                        <div className="slide-title">{image.title}</div>
                        <div className="slide-description">
                          {image.description}
                        </div>
                        <span className="slide-type">{image.type}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <div className="slider-nav prev" onClick={prevSlide}>
                  ‹
                </div>
                <div className="slider-nav next" onClick={nextSlide}>
                  ›
                </div>

                {/* Indicators with Counter */}
                <div className="slider-indicators">
                  <div className="slide-counter">
                    {currentIndex + 1} / {galleryImages.length}
                  </div>
                  <div className="indicator-dots">
                    {galleryImages.map((_, index) => (
                      <div
                        key={index}
                        className={`indicator ${index === currentIndex ? "active" : ""}`}
                        onClick={() => goToSlide(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </StyledSlider>
          </AnimatedSection>
        </Container>
      </section>
    </Element>
  );
};

export default AppGallery;
