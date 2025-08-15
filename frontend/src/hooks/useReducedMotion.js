import { useState, useEffect } from 'react';


export const useReducedMotion = () => {
  const getUserPreference = () => {
    const saved = localStorage.getItem('reducedMotion');
    return saved === 'true' ? true : saved === 'false' ? false : null;
  };

  const getSystemPreference = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const [reducedMotion, setReducedMotion] = useState(() => {
    const userPreference = getUserPreference();
    return userPreference !== null ? userPreference : getSystemPreference();
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      if (getUserPreference() === null) {
        setReducedMotion(mediaQuery.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    localStorage.setItem('reducedMotion', newValue.toString());
    setReducedMotion(newValue);
  };

  return [reducedMotion, toggleReducedMotion];
};
