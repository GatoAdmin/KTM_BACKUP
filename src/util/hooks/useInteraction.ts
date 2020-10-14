import {MutableRefObject, useEffect, useMemo, useRef, useState} from 'react';

interface IntersectionOption {
  threshold?: number;
}

export const useIntersection = (
  ref: MutableRefObject<HTMLElement | null>,
  option: IntersectionOption = {
    threshold: 0,
  }
) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const { threshold = 0 } = option;
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            const {
              isIntersecting,
              boundingClientRect: { y },
            } = entry;
            const responseToTop = y >= 0;
            const AlreadyRendered = y <= 0;
            if (responseToTop) {
              setVisible(isIntersecting);
            } else if (AlreadyRendered) {
              setVisible(true);
              observer.disconnect();
            }
          });
        },
        { threshold },
      );
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [option, ref]);
  return visible;
};