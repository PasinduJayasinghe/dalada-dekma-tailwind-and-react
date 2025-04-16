import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const AnimatedElement = ({
  children,
  direction = "up", // "up", "down", "left", "right"
  delay = 0, // delay in ms
  duration = 700, // animation duration in ms
  distance = 12, // distance to move in px
  once = true, // if true, only animates once on mount
  easing = "ease-out", // CSS easing function
  threshold = 0.1, // IntersectionObserver threshold
  className = "", // additional classes
  startVisible = false, // if true, element starts visible
  triggerOnce = true, // if true, animation only triggers once
}) => {
  const [isVisible, setIsVisible] = useState(startVisible);
  const elementRef = useRef(null);

  useEffect(() => {
    if (startVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small delay before setting visible for smoother effect
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          // Unobserve if we only want to trigger once
          if (triggerOnce) {
            observer.unobserve(elementRef.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { 
        threshold, 
        rootMargin: '0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold, triggerOnce, startVisible]);

  // Get the transform value based on direction
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "up":
          return `translateY(${distance}px)`;
        case "down":
          return `translateY(-${distance}px)`;
        case "left":
          return `translateX(${distance}px)`;
        case "right":
          return `translateX(-${distance}px)`;
        case "up-left":
          return `translate(${distance}px, ${distance}px)`;
        case "up-right":
          return `translate(-${distance}px, ${distance}px)`;
        case "down-left":
          return `translate(${distance}px, -${distance}px)`;
        case "down-right":
          return `translate(-${distance}px, -${distance}px)`;
        default:
          return `translateY(${distance}px)`;
      }
    }
    return "translate(0, 0)";
  };

  const styles = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `all ${duration}ms ${easing}`,
  };

  return (
    <div ref={elementRef} className={className} style={styles}>
      {children}
    </div>
  );
};

AnimatedElement.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf([
    "up", "down", "left", "right",
    "up-left", "up-right", "down-left", "down-right"
  ]),
  delay: PropTypes.number,
  duration: PropTypes.number,
  distance: PropTypes.number,
  once: PropTypes.bool,
  easing: PropTypes.string,
  threshold: PropTypes.number,
  className: PropTypes.string,
  startVisible: PropTypes.bool,
  triggerOnce: PropTypes.bool,
};

export default AnimatedElement;