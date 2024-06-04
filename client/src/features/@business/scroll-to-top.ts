import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';

export function ScrollToTop() {
  const {
    location: { pathname },
  } = useRouterState();

  // @note pathname이 바뀔때마다 스크롤 최상단으로 이동
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}
