import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    if (prevPathname.current !== location.pathname) {
      window.scrollTo(0, 0);
      prevPathname.current = location.pathname;
    }
  }, [location]);

  return null;
}

export default ScrollToTop;
