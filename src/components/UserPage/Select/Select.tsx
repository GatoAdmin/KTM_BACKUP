import * as React from 'react';
import { Option, OptionContainer, SelectContainer, SelectDisplay } from '@components/UserPage/Select/Select.style';

interface option {
  value: string;
  display: string;
}

interface SelectProps {
  placeholder: string;
  options: Array<string | number>;
}

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

const Select: React.VFC<SelectProps> = ({ options, placeholder }) => {
  const [inputValue, setInputValue] = React.useState<string | number>(placeholder);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visible, toggleVisible] = useVisible(containerRef);

  return (
    <SelectContainer ref={containerRef}>
      <SelectDisplay onClick={toggleVisible}>{inputValue}</SelectDisplay>
      <OptionContainer show={visible}>
        {options.map((value) => (
          <Option key={value}>{value}</Option>
        ))}
      </OptionContainer>
    </SelectContainer>
  );
};

export default Select;
