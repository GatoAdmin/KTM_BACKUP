import * as React from "react";
import {Dispatch, SetStateAction} from "react";
import {
  CheckBox,
  FilterButton,
  FilterIconDescription,
  ExamFilterCheckBoxContainer,
  ExamFilterCheckBoxLabel,
  ExamFilterCheckLabelBox,
  ExamFilterContainer, ExamFilterRow, ExamFilterRowTitle, ExamFilterRowContent, ExamFilterCheckBoxDescription,
} from './ExamFilter.style';
import FilterModal from "@components/RecommendPage/FilterModal/FilterModal";
import CheckIcon from "../../../assets/check.svg";
import useVisible from "@util/hooks/useVisible";
import LicenseIcon from '../../../assets/driving-license.svg';

interface LocationFilterProps {
  topikValue: Array<number>;
  setTopikValue: Dispatch<SetStateAction<Array<number>>>;
  selfTestValue: boolean;
  setSelfTestValue: Dispatch<SetStateAction<boolean>>
}

const topik: Array<{name: string; value: number}> = [
  {name: "2급", value: 2},
  {name: "3급", value: 3},
  {name: "4급", value: 4},
  {name: "5급", value: 5},
  {name: "6급", value: 6},
  {name: "상관 없음", value: 0},
];

const ExamFilter: React.VFC<LocationFilterProps> = ({
  topikValue,
  setTopikValue,
  selfTestValue,
  setSelfTestValue
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [tempTopikValue, setTempTopikValue] = React.useState<Array<number>>(topikValue);
  const [tempSelfTestValue, setTempSelfTestValue] = React.useState<boolean>(selfTestValue);
  const [visible, toggleVisible] = useVisible(containerRef);

  const onChangeTempTopikCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (!isNaN(Number(target.value)) && topikValue.includes(Number(target.value))) {
      const targetIndex = tempTopikValue.indexOf(Number(target.value))
      setTempTopikValue(state => state.splice(targetIndex, 1))
    } else {
      setTempTopikValue(state => state.concat(Number(target.value)))
    }
  }
  const onChangeTempSelfTestValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setTempSelfTestValue(target?.checked);
  }

  const submitFilter = () => {
    toggleVisible();
    setTopikValue(tempTopikValue);
    setSelfTestValue(tempSelfTestValue);
  }
  const closeModal = () => {
    toggleVisible();
    setTempTopikValue(topikValue);
    setTempSelfTestValue(selfTestValue);
  }

  return (
    <ExamFilterContainer ref={containerRef}>
      <FilterButton onClick={toggleVisible}>
        <LicenseIcon />
        <FilterIconDescription>어학요건</FilterIconDescription>
      </FilterButton>
      <FilterModal
        visible={visible}
        toggleVisible={toggleVisible}
        submitFilter={submitFilter}
        closeModal={closeModal}
        width="460px"
        height="220px"
      >
        <ExamFilterRow>
          <ExamFilterRowTitle>TOPIK</ExamFilterRowTitle>
          <ExamFilterRowContent>
            {topik.map((topikValue, index) => (
              <ExamFilterCheckBoxContainer key={topikValue.name}>
                <CheckBox
                  id={`topik-${index}`}
                  value={topikValue.value}
                  checked={tempTopikValue.includes(topikValue.value)}
                  onChange={onChangeTempTopikCheckBox} />
                <ExamFilterCheckBoxLabel htmlFor={`topik-${index}`}>
                  <ExamFilterCheckBoxDescription>{topikValue.name}</ExamFilterCheckBoxDescription>
                  <ExamFilterCheckLabelBox>
                    <CheckIcon />
                  </ExamFilterCheckLabelBox>
                </ExamFilterCheckBoxLabel>
              </ExamFilterCheckBoxContainer>
            ))}
          </ExamFilterRowContent>
        </ExamFilterRow>
        <ExamFilterRow>
          <ExamFilterRowTitle>자체 시험</ExamFilterRowTitle>
          <ExamFilterRowContent>
            <ExamFilterCheckBoxContainer>
              <CheckBox id="self-test" checked={tempSelfTestValue} onChange={onChangeTempSelfTestValue} />
              <ExamFilterCheckBoxLabel htmlFor="self-test">
                <ExamFilterCheckLabelBox>
                  <CheckIcon />
                </ExamFilterCheckLabelBox>
              </ExamFilterCheckBoxLabel>
            </ExamFilterCheckBoxContainer>
          </ExamFilterRowContent>
        </ExamFilterRow>
      </FilterModal>
    </ExamFilterContainer>
  )
}

export default ExamFilter;