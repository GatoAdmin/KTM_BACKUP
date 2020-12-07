import * as React from 'react';

const useVisible = (ref: React.MutableRefObject<HTMLElement | null>): [boolean, () => void] => {
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    const onCloseSelect = (event: MouseEvent) => {
      const container = ref?.current;
      const { target } = event;
      if (container && (container === target || !container.contains(target as Node))) setVisible(false);
    };
    if (isBrowser) window.addEventListener('click', onCloseSelect);
    return () => {
      if (isBrowser) window.removeEventListener('click', onCloseSelect);
    };
  }, []);

  return [visible, () => setVisible((state) => !state)];
};

export default useVisible;
