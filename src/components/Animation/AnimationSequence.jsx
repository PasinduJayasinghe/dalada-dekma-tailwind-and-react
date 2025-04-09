import React from "react";
import PropTypes from "prop-types";
import AnimatedElement from "./AnimatedElement";

const AnimationSequence = ({
  children,
  direction = "up",
  baseDelay = 300,
  staggerDelay = 200,
  duration = 700,
  distance = 12,
  easing = "ease-out",
  className = "",
  triggerOnce = true,
  threshold = 0.1,
  startVisible = false,
  onSequenceComplete = () => {},
  component: WrapperComponent = React.Fragment,
  wrapperProps = {},
}) => {
  // Track completed animations
  const animationCount = React.useRef(0);
  const totalAnimations = React.Children.count(children);

  const handleAnimationComplete = () => {
    animationCount.current += 1;
    if (animationCount.current === totalAnimations) {
      onSequenceComplete();
    }
  };

  // Clone children and add animation props
  const animatedChildren = React.Children.map(children, (child, index) => {
    const delay = baseDelay + index * staggerDelay;
    
    // Skip if child is null or undefined
    if (!child) return null;

    // If already an AnimatedElement, merge props
    if (child.type === AnimatedElement) {
      return React.cloneElement(child, {
        key: child.key || index,
        delay: child.props.delay ?? delay,
        direction: child.props.direction ?? direction,
        duration: child.props.duration ?? duration,
        distance: child.props.distance ?? distance,
        easing: child.props.easing ?? easing,
        triggerOnce: child.props.triggerOnce ?? triggerOnce,
        threshold: child.props.threshold ?? threshold,
        startVisible: child.props.startVisible ?? startVisible,
        onAnimationComplete: () => {
          child.props.onAnimationComplete?.();
          handleAnimationComplete();
        },
      });
    }

    // Wrap regular children in AnimatedElement
    return (
      <AnimatedElement
        key={index}
        direction={direction}
        delay={delay}
        duration={duration}
        distance={distance}
        easing={easing}
        triggerOnce={triggerOnce}
        threshold={threshold}
        startVisible={startVisible}
        onAnimationComplete={handleAnimationComplete}
      >
        {child}
      </AnimatedElement>
    );
  });

  return (
    <WrapperComponent {...wrapperProps} className={className}>
      {animatedChildren}
    </WrapperComponent>
  );
};

AnimationSequence.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf([
    "up", "down", "left", "right", 
    "up-left", "up-right", "down-left", "down-right"
  ]),
  baseDelay: PropTypes.number,
  staggerDelay: PropTypes.number,
  duration: PropTypes.number,
  distance: PropTypes.number,
  easing: PropTypes.string,
  className: PropTypes.string,
  triggerOnce: PropTypes.bool,
  threshold: PropTypes.number,
  startVisible: PropTypes.bool,
  onSequenceComplete: PropTypes.func,
  component: PropTypes.elementType,
  wrapperProps: PropTypes.object,
};

export default AnimationSequence;