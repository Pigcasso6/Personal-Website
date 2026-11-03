import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AppleRevealContextType {
  isInView: boolean;
}

const AppleRevealContext = createContext<AppleRevealContextType>({ isInView: false });

export const useAppleRevealContext = () => useContext(AppleRevealContext);

interface AppleScrollSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  as?: 'section' | 'div';
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  duration?: number;
}

/**
 * AppleScrollSection
 * Wraps a major page section/chapter to provide an authentic Apple-style scroll reveal.
 * When the user scrolls down to this chapter, the content fades in and glides upward smoothly,
 * exactly like the product showcase pages on apple.com.
 */
export const AppleScrollSection: React.FC<AppleScrollSectionProps> = ({
  id,
  className = '',
  children,
  as: Component = 'section',
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  delay = 0,
  duration = 1350,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, show immediately without animation
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPrefersReducedMotion(true);
      setIsInView(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Check if element is already well inside the visible viewport on initial load (e.g., top of page or refreshed)
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.45 && rect.bottom > 0) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(node);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  // For reduced motion, render clean without transitions
  if (prefersReducedMotion) {
    return (
      <AppleRevealContext.Provider value={{ isInView: true }}>
        <Component id={id} ref={ref as any} className={className}>
          {children}
        </Component>
      </AppleRevealContext.Provider>
    );
  }

  return (
    <AppleRevealContext.Provider value={{ isInView }}>
      <Component
        id={id}
        ref={ref as any}
        className={className}
        style={{
          opacity: isInView ? 1 : 0,
          transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          willChange: isInView ? 'auto' : 'opacity',
        }}
      >
        {children}
      </Component>
    </AppleRevealContext.Provider>
  );
};

interface AppleRevealItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  yOffset?: number; // Starting Y translation in px (Apple uses 48-60px for graceful displacement)
  duration?: number; // Transition duration in ms (Apple uses 1200-1400ms)
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  scale?: boolean; // Subtle optical scale (0.97 -> 1)
}

/**
 * AppleRevealItem
 * Sub-element that cascades into view with deliberate delays inside an AppleScrollSection,
 * creating Apple's iconic cinematic reveal effect for headings, cards, and buttons with
 * unhurried easing (cubic-bezier(0.16, 1, 0.3, 1)) and soft optical depth focus.
 */
export const AppleRevealItem: React.FC<AppleRevealItemProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 48,
  duration = 1350,
  as: Component = 'div',
  style = {},
  scale = false,
}) => {
  const { isInView } = useAppleRevealContext();

  const initialTransform = scale
    ? `translate3d(0, ${yOffset}px, 0) scale(0.97)`
    : `translate3d(0, ${yOffset}px, 0)`;
  const finalTransform = scale
    ? 'translate3d(0, 0, 0) scale(1)'
    : 'translate3d(0, 0, 0)';

  return (
    <Component
      className={className}
      style={{
        ...style,
        opacity: isInView ? 1 : 0,
        transform: isInView ? finalTransform : initialTransform,
        filter: isInView ? 'blur(0px)' : 'blur(8px)',
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isInView ? 'auto' : 'opacity, transform, filter',
      }}
    >
      {children}
    </Component>
  );
};
