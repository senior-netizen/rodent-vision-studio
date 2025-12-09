import { useEffect, useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Fade out
    setIsVisible(false);
    
    // After fade out, update children and fade in
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timeout);
  }, [location.pathname, children]);

  // Initial mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`page-transition ${isVisible ? 'page-visible' : 'page-hidden'}`}
    >
      {displayChildren}
    </div>
  );
};
