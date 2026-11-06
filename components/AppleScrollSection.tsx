import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type RevealState = 'below' | 'visible' | 'above';

interface AppleRevealContextType {
  state: RevealState;
  isInView: boolean;
}

const AppleRevealContext = createContext<AppleRevealContextType>({
  state: 'below',
  isInView: false,
});

export const useAppleRevealContext = () => useContext(AppleRevealContext);

interface AppleScrollSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  as?: 'section' | 'div';
  threshold?: number | number[];
  rootMargin?: string;
  delay?: number;
  duration?: number;
}

/**
 * AppleScrollSection
 * Wraps a major page section/chapter providing Apple's iconic scroll choreography:
 * - Unhurried, deliberate fade-in & upward glide as you scroll down into the section
 * - Graceful, cinematic fade-out as you scroll past the section toward the top
 * - Silky smooth fade back in when scrolling back up
 */
export const AppleScrollSection: React.FC<AppleScrollSectionProps> = ({
  id,
  className = '',
  children,
  as: Component = 'section',
  rootMargin = '-3% 0px -6% 0px',
  delay = 0,
  duration = 1150,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<RevealState>('below');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPrefersReducedMotion(true);
      setState('visible');
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Check initial position on mount
    const rect = node.getBoundingClientRect();
    const windowH = window.innerHeight;
    if (rect.top < windowH * 0.92 && rect.bottom > windowH * 0.08) {
      setState('visible');
    } else if (rect.bottom <= windowH * 0.08) {
      setState('above');
    } else {
      setState('below');
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('visible');
        } else {
          // If no longer intersecting, check if it scrolled past the top or is below the bottom
          if (entry.boundingClientRect.top < 0) {
            setState('above');
          } else {
            setState('below');
          }
        }
      },
      {
        threshold: [0, 0.05, 0.1],
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  if (prefersReducedMotion) {
    return (
      <AppleRevealContext.Provider value={{ state: 'visible', isInView: true }}>
        <Component id={id} ref={ref as any} className={className}>
          {children}
        </Component>
      </AppleRevealContext.Provider>
    );
  }

  // Section-level graceful opacity and drift
  let opacity = 0;
  let transform = 'translate3d(0, 36px, 0)';

  if (state === 'visible') {
    opacity = 1;
    transform = 'translate3d(0, 0, 0)';
  } else if (state === 'above') {
    // Cinematic Apple fade-out when scrolled past to the top
    opacity = 0;
    transform = 'translate3d(0, -28px, 0)';
  } else {
    // Below viewport
    opacity = 0;
    transform = 'translate3d(0, 36px, 0)';
  }

  return (
    <AppleRevealContext.Provider value={{ state, isInView: state === 'visible' }}>
      <Component
        id={id}
        ref={ref as any}
        className={className}
        style={{
          opacity,
          transform,
          transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${state === 'visible' ? delay : 0}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${state === 'visible' ? delay : 0}ms`,
          willChange: 'opacity, transform',
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
  yOffset?: number; // Starting Y translation in px
  duration?: number; // Transition duration in ms (Unhurried Apple timing: 1150ms)
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  scale?: boolean; // Subtle optical scale (0.97 -> 1)
}

/**
 * AppleRevealItem
 * Sub-element that cascades into view with deliberate unhurried timing,
 * and gracefully fades out with an upward drift when scrolled past, exactly like apple.com.
 */
export const AppleRevealItem: React.FC<AppleRevealItemProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 36,
  duration = 1150,
  as: Component = 'div',
  style = {},
  scale = false,
}) => {
  const itemRef = useRef<HTMLElement>(null);
  const [itemState, setItemState] = useState<RevealState>('below');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPrefersReducedMotion(true);
      setItemState('visible');
      return;
    }

    const node = itemRef.current;
    if (!node) return;

    // Check initial position on mount
    const rect = node.getBoundingClientRect();
    const windowH = window.innerHeight;
    if (rect.top < windowH * 0.94 && rect.bottom > windowH * 0.06) {
      setItemState('visible');
    } else if (rect.bottom <= windowH * 0.06) {
      setItemState('above');
    } else {
      setItemState('below');
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setItemState('visible');
        } else {
          // If scrolled past above the viewport vs waiting below
          if (entry.boundingClientRect.top < 0) {
            setItemState('above');
          } else {
            setItemState('below');
          }
        }
      },
      {
        threshold: [0, 0.05, 0.1],
        rootMargin: '-2% 0px -6% 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (prefersReducedMotion) {
    return (
      <Component className={className} style={style}>
        {children}
      </Component>
    );
  }

  // Determine transform & opacity based on active scroll state
  let opacity = 0;
  let transform = `translate3d(0, ${yOffset}px, 0)`;

  if (itemState === 'visible') {
    opacity = 1;
    transform = scale ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 0, 0)';
  } else if (itemState === 'above') {
    // Graceful fade-out when scrolled past to the top (Apple-style subtle upward drift & gentle fade)
    opacity = 0;
    transform = scale ? 'translate3d(0, -24px, 0) scale(0.98)' : 'translate3d(0, -24px, 0)';
  } else {
    // Below viewport: waiting to enter
    opacity = 0;
    transform = scale ? `translate3d(0, ${yOffset}px, 0) scale(0.97)` : `translate3d(0, ${yOffset}px, 0)`;
  }

  return (
    <Component
      ref={itemRef as any}
      className={className}
      style={{
        ...style,
        opacity,
        transform,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${itemState === 'visible' ? delay : 0}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${itemState === 'visible' ? delay : 0}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
};
