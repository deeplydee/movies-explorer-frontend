import { useState, useEffect } from 'react';

const getWidthWindow = () => document.documentElement.clientWidth;

export const useWindowResize = () => {
  const [widthWindow, setWidthWindow] = useState(getWidthWindow());

  useEffect(() => {
    let timeOut = null;

    const windowResizeListener = () => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => setWidthWindow(getWidthWindow()), 200);
    };

    window.addEventListener('resize', windowResizeListener);
    return () => window.removeEventListener('resize', windowResizeListener);
  }, []);

  return widthWindow;
};
