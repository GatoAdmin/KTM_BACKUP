import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import FilterModal from '@components/RecommendPage/FilterModal/FilterModal';
import useVisible from '@util/hooks/useVisible';
import LocationIcon from '../../../assets/location.svg';
import {
  CheckBox,
  FilterButton,
  FilterIconDescription,
  LocationFilterCheckBoxContainer,
  LocationFilterCheckBoxLabel,
  LocationFilterCheckLabelBox,
  LocationFilterContainer,
} from './LocationFilter.style';
import CheckIcon from '../../../assets/check.svg';

const locationArray = [
  { name: '서울', value: 'SO' },
  { name: '인천', value: 'IC' },
  { name: '경기', value: 'KK' },
  { name: '강원', value: 'GW' },
  { name: '대전', value: 'DJ' },
  { name: '세종', value: 'SJ' },
  { name: '충남', value: 'CN' },
  { name: '충북', value: 'CB' },
  { name: '부산', value: 'BS' },
  { name: '대구', value: 'DG' },
  { name: '울산', value: 'US' },
  { name: '경남', value: 'KN' },
  { name: '경북', value: 'KB' },
  { name: '광주', value: 'GJ' },
  { name: '전남', value: 'JN' },
  { name: '전북', value: 'JB' },
  { name: '제주', value: 'JJ' },
] as const;
export type KoreaLocation = typeof locationArray[number]['value'];

interface LocationFilterProps {
  filterValue: Array<KoreaLocation>;
  setFilterValue: Dispatch<SetStateAction<Array<KoreaLocation>>>;
}

const LocationFilter: React.VFC<LocationFilterProps> = ({
  filterValue,
  setFilterValue,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [tempLocationValue, setTempLocationValue] = React.useState<Array<KoreaLocation>>(filterValue);
  const [visible, toggleVisible] = useVisible(containerRef);
  const submitFilter = () => {
    toggleVisible();
    setFilterValue(tempLocationValue);
  };
  const closeModal = () => {
    toggleVisible();
    setTempLocationValue(filterValue);
  };
  const onChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const targetValue: KoreaLocation = target.value as KoreaLocation;
    if (tempLocationValue.includes(targetValue)) {
      const targetIndex = tempLocationValue.indexOf(targetValue);
      const newTempLocationValue = Array.from(tempLocationValue);
      newTempLocationValue.splice(targetIndex, 1);
      setTempLocationValue(newTempLocationValue);
    } else {
      setTempLocationValue((state) => state.concat(targetValue));
    }
  };

  return (
    <LocationFilterContainer ref={containerRef}>
      <FilterButton onClick={toggleVisible}>
        <LocationIcon />
        <FilterIconDescription>위치</FilterIconDescription>
      </FilterButton>
      <FilterModal
        visible={visible}
        toggleVisible={toggleVisible}
        closeModal={closeModal}
        submitFilter={submitFilter}
        width="634px"
        height="230px"
      >
        {locationArray.map((location, index) => (
          <LocationFilterCheckBoxContainer key={location.name}>
            <CheckBox
              id={`location-${index}`}
              value={location.value}
              checked={tempLocationValue.includes(location.value)}
              onChange={onChangeCheckBox}
            />
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
  );
};

export default LocationFilter;
