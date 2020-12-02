import * as React from "react";
import {Dispatch, SetStateAction} from "react";
import LocationIcon from '../../../assets/location.svg';
import {
  CheckBox,
  FilterButton,
  FilterIconDescription,
  LocationFilterCheckBoxContainer,
  LocationFilterCheckBoxLabel,
  LocationFilterCheckLabelBox,
  LocationFilterContainer
} from "./LocationFilter.style";
import FilterModal from "@components/RecommendPage/FilterModal/FilterModal";
import CheckIcon from "../../../assets/check.svg";
import useVisible from "@util/hooks/useVisible";

export const locationArray: Array<{ name: string; value: string; }> = [
  {name: '서울', value: "SO"},
  {name: '인천', value: "IC"},
  {name: '경기', value: "KK"},
  {name: '강원', value: "GW"},
  {name: '대전', value: "DJ"},
  {name: '세종', value: "SJ"},
  {name: '충남', value: "CN"},
  {name: '충북', value: "CB"},
  {name: '부산', value: "BS"},
  {name: '대구', value: "DG"},
  {name: '울산', value: "US"},
  {name: '경남', value: "KN"},
  {name: '경북', value: "KB"},
  {name: '광주', value: "GJ"},
  {name: '전남', value: "JN"},
  {name: '전북', value: "JB"},
  {name: '제주', value: "JJ"},
];

interface LocationFilterProps {
  filterValue: Array<string>;
  setFilterValue: Dispatch<SetStateAction<Array<string>>>;
}

const LocationFilter: React.VFC<LocationFilterProps> = ({
  filterValue,
  setFilterValue
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [visible, toggleVisible] = useVisible(containerRef);
  const submitFilter = () => {
    const nextValueArray: Array<string> = [];
    const checkBoxArray = modalRef?.current?.getElementsByTagName("input");
    if (!checkBoxArray) return;
    Array.from(checkBoxArray).forEach(element => {
      if (element.checked)
        nextValueArray.push(element.value);
    })
    setFilterValue(nextValueArray);
  }

  return (
    <LocationFilterContainer ref={containerRef}>
      <FilterButton onClick={toggleVisible}>
        <LocationIcon />
        <FilterIconDescription>위치</FilterIconDescription>
      </FilterButton>
      <FilterModal
        ref={modalRef}
        visible={visible}
        toggleVisible={toggleVisible}
        submitFilter={submitFilter}
        width="634px"
        height="230px"
      >
        {locationArray.map((location, index) => (
          <LocationFilterCheckBoxContainer key={location.name}>
            {console.log(filterValue.includes(location.value))}
            <CheckBox id={`location-${index}`} defaultChecked={filterValue.includes(location.value)} />
            <LocationFilterCheckBoxLabel htmlFor={`location-${index}`}>
              {location.name}
              <LocationFilterCheckLabelBox>
                <CheckIcon />
              </LocationFilterCheckLabelBox>
            </LocationFilterCheckBoxLabel>
          </LocationFilterCheckBoxContainer>
        ))}
      </FilterModal>
    </LocationFilterContainer>
  )
}

export default LocationFilter;