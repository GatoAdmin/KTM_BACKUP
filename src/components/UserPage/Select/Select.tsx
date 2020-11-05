import * as React from "react";
import {
  Option,
  OptionContainer,
  SelectContainer,
  SelectDisplay
} from "@components/UserPage/Select/Select.style";

interface option {
  value: string;
  display: string;
}

interface SelectProps {
  placeholder: string;
  options: Array<string | number>
}



const Select: React.VFC<SelectProps> = ({
  options,
  placeholder
}) => {
  const [value, setValue] = React.useState<string | number>(placeholder);
  const [visible, setVisible] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const toggleSelect = () => {
    setVisible(state => !state);
  }

  React.useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    const onCloseSelect = (event: MouseEvent) => {
      const container = containerRef?.current;
      const { target } = event;
      if(container && (container === target || !container.contains(target as Node)))
        setVisible(false)
    }
    if (isBrowser) window.addEventListener('click', onCloseSelect);
    return () => {
      if (isBrowser) window.removeEventListener('click', onCloseSelect);
    };
  }, []);
  return (
    <SelectContainer ref={containerRef}>
      <SelectDisplay
        onClick={toggleSelect}>
        { value }
      </SelectDisplay>
      <OptionContainer show={visible}>
        {options.map(value => (
          <Option key={value}>
            { value }
          </Option>
        ))}
      </OptionContainer>
    </SelectContainer>
  )
}

export default Select;
