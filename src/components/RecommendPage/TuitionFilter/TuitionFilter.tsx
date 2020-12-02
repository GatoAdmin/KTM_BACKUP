import * as React from "react";
import {Dispatch, SetStateAction} from "react";
import LocationIcon from '../../../assets/location.svg';
import {
  CheckBox,
  FilterButton, FilterContainer,
  FilterIconDescription,
  LocationFilterCheckBoxContainer,
  LocationFilterCheckBoxLabel,
  LocationFilterCheckLabelBox,
  SearchFilter, TopikFilterCheckBoxContainer, TopikFilterCheckBoxLabel, TopikFilterCheckLabelBox,
  TuitionFilterCheckBoxContainer, TuitionFilterCheckBoxLabel, TuitionFilterCheckLabelBox
} from "@views/RecommendPage/RecommendListPage/RecommendListPage.style";
import FilterModal from "@components/RecommendPage/FilterModal/FilterModal";
import CheckIcon from "../../../assets/check.svg";
import useVisible from "@util/hooks/useVisible";
import EducationIcon from "../../../assets/education-cost.svg";
import LicenseIcon from "../../../assets/driving-license.svg";

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

const TuitionFilter: React.VFC<LocationFilterProps> = ({
  filterValue,
  setFilterValue
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visible, toggleVisible] = useVisible(containerRef);
  const submitFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (target.checked) {
      setFilterValue(state => state.concat(target.value));
    } else {
      const nowIndex = filterValue.indexOf(target.value);
      setFilterValue(state => state.splice(nowIndex, 1))
    }
  }

  return (
    <SearchFilter ref={containerRef}>
      <SearchFilter onClick={onClickModal}>
        <FilterButton onClick={toggleTuitionFeeModal}>
          <EducationIcon />
          <FilterIconDescription>등록금</FilterIconDescription>
        </FilterButton>
        <FilterModal
          visible={tuitionFeeModalShow}
          setVisible={setTuitionFeeModalShow}
          ref={tuitionFeeModalRef}
          description="한 학기 기준"
          width="634px"
          height="230px"
        >
          {tuitionFee.map((tuitionFeeValue, index) => (
            <TuitionFilterCheckBoxContainer key={tuitionFeeValue}>
              <CheckBox id={`tuition-${index}`} onChange={() => console.log('시발')} />
              <TuitionFilterCheckBoxLabel htmlFor={`tuition-${index}`}>
                {tuitionFeeValue} ~ {tuitionFeeValue + 100}만원
                <TuitionFilterCheckLabelBox>
                  <CheckIcon />
                </TuitionFilterCheckLabelBox>
              </TuitionFilterCheckBoxLabel>
            </TuitionFilterCheckBoxContainer>
          ))}
        </FilterModal>
      </SearchFilter>

      <SearchFilter onClick={onClickModal}>
        <FilterButton onClick={toggleTopikFeeModal}>
          <LicenseIcon />
          <FilterIconDescription>TOPIK</FilterIconDescription>
        </FilterButton>
        <FilterModal
          visible={topikModalShow}
          setVisible={setTopikFeeModalShow}
          ref={topikModalRef}
          width="460px"
          height="167px"
        >
          {topik.map((topikValue, index) => (
            <TopikFilterCheckBoxContainer key={topikValue}>
              <CheckBox id={`topik-${index}`} />
              <TopikFilterCheckBoxLabel htmlFor={`topik-${index}`}>
                {topikValue}
                <TopikFilterCheckLabelBox>
                  <CheckIcon />
                </TopikFilterCheckLabelBox>
              </TopikFilterCheckBoxLabel>
            </TopikFilterCheckBoxContainer>
          ))}
        </FilterModal>
      </SearchFilter>


      <FilterButton onClick={toggleVisible}>
        <LocationIcon />
        <FilterIconDescription>위치</FilterIconDescription>
      </FilterButton>
      <FilterModal
        visible={visible}
        toggleVisible={toggleVisible}
        submitFilter={submitFilter}
        width="634px"
        height="230px"
      >
        {locationArray.map((location, index) => (
          <LocationFilterCheckBoxContainer key={location.name}>
            <CheckBox id={`location-${index}`} value={location.value} checked={location.value in filterValue} />
            <LocationFilterCheckBoxLabel htmlFor={`location-${index}`}>
              {location.name}
              <LocationFilterCheckLabelBox>
                <CheckIcon />
              </LocationFilterCheckLabelBox>
            </LocationFilterCheckBoxLabel>
          </LocationFilterCheckBoxContainer>
        ))}
      </FilterModal>
    </SearchFilter>
  )
}

export default TuitionFilter;