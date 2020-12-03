import * as React from 'react';
import { NextPage } from 'next';
import Header from '@components/Shared/Header/Header';
import FilterModal, { FilterModalRef } from '@components/RecommendPage/FilterModal/FilterModal';
import {
  FilterContainer,
  FilterIconContainer,
  FilterShowButton,
  FilterShowIcon,
  FilterShowLabel,
  SearchBar,
  SearchBarContainer,
  SearchButton,
  SearchIcon,
  SearchInput,
  SearchSection,
  SearchSectionContainer,
  FilterIconDescription,
  FilterButton,
  FilterInputContainer,
  CheckBox,
  FilterCheckBoxContainer,
  FilterCheckBoxLabel,
  FilterCheckLabelBox,
  SearchFilter,
  TuitionFilterCheckBoxContainer,
  TuitionFilterCheckBoxLabel,
  TuitionFilterCheckLabelBox,
  TopikFilterCheckLabelBox,
  TopikFilterCheckBoxLabel,
  TopikFilterCheckBoxContainer,
  UnivListSection,
  UnivListTitle,
  UnivListPagination,
  UnivListPrevButton,
  UnivListNextButton,
} from '@views/RecommendPage/RecommendListPage/RecommendListPage.style';
import UnivItem from '@components/RecommendPage/UnivItem/UnivItem';
import EducationIcon from '../../../assets/education-cost.svg';
import LicenseIcon from '../../../assets/driving-license.svg';
import GrantIcon from '../../../assets/grant.svg';
import DiversifyIcon from '../../../assets/diversify.svg';
import CheckIcon from '../../../assets/check.svg';
import LocationFilter, { locationArray } from "@components/RecommendPage/LocationFilter/LocationFilter";
import TuitionFilter from '@components/RecommendPage/TuitionFilter/TuitionFilter';
import ExamFilter from '@components/RecommendPage/ExamFilter/ExamFilter';


// @ts-ignore
const tuitionFee: Array<number> = [100, 200, 300, 400,];
const topik: Array<string> = ['1급', '2급', '3급', '4급', '5급', '6급'];
const univList = [
  {
    name: '한국외국어대학교',
    address: '서울특별시 동대문구 이문로 107',
    topik: 6,
    grant: true,
    tuitionFee: 710,
    type: '4년제',
    thumbnail: '/images/aboard.jpg',
    logo: '/images/aboard_logo.svg',
    to: "/recommend/1"
  },
  { name: '한림대학교', address: '강원도 춘천시 한림대학길 1', topik: 4, grant: true, tuitionFee: 740, type: '4년제', to: "/recommend/1" },
  { name: '한림대학교', address: '강원도 춘천시 한림대학길 1', topik: 4, grant: true, tuitionFee: 740, type: '4년제', to: "/recommend/1" },
  { name: '한림대학교', address: '강원도 춘천시 한림대학길 1', topik: 4, grant: true, tuitionFee: 740, type: '4년제', to: "/recommend/1" },
  { name: '한림대학교', address: '강원도 춘천시 한림대학길 1', topik: 4, grant: true, tuitionFee: 740, type: '4년제', to: "/recommend/1" },
  { name: '한림대학교', address: '강원도 춘천시 한림대학길 1', topik: 4, grant: true, tuitionFee: 740, type: '4년제', to: "/recommend/1" },
];

const useStateWithToggle = (initialState: boolean) => {
  const [toggle, setToggle] = React.useState<boolean>(initialState);

  return [toggle, () => setToggle((state) => !state), setToggle] as const;
};

const RecommendListPage: NextPage = () => {
  const [filterShow, toggleFilterShow] = useStateWithToggle(false);
  const [locationValue, setLocationValue] = React.useState<Array<typeof locationArray[number]['value']>>([]);
  const [tuitionValue, setTuitionValue] = React.useState<number | null>(null);
  const [topikValue, setTopikValue] = React.useState<Array<number>>([]);
  const [selfTestValue, setSelfTestValue] = React.useState<boolean>(false);

  return (
    <>
      <Header background="dark" position="absolute" />
      <SearchSectionContainer>
        <SearchSection>
          모든 대학을 알려드립니다
          <SearchBarContainer>
            <SearchBar>
              <SearchInput />
              <SearchButton>
                <SearchIcon src="/images/search.png" />
              </SearchButton>
            </SearchBar>
            <FilterShowButton onChange={toggleFilterShow} />
            <FilterShowLabel>
              <FilterShowIcon />
            </FilterShowLabel>
          </SearchBarContainer>
          <FilterContainer show={filterShow}>
            <LocationFilter filterValue={locationValue} setFilterValue={setLocationValue} />

            <TuitionFilter filterValue={tuitionValue} setFilterValue={setTuitionValue} />

            <ExamFilter
              topikValue={topikValue}
              setTopikValue={setTopikValue}
              selfTestValue={selfTestValue}
              setSelfTestValue={setSelfTestValue}/>

            <FilterIconContainer>
              <GrantIcon />
              <FilterIconDescription>외국인 장학금</FilterIconDescription>
              <FilterInputContainer>
                <FilterCheckBoxContainer>
                  <CheckBox id="exist" />
                  <FilterCheckBoxLabel htmlFor="exist">
                    <FilterCheckLabelBox>
                      <CheckIcon />
                    </FilterCheckLabelBox>
                    있음
                  </FilterCheckBoxLabel>
                </FilterCheckBoxContainer>
                <FilterCheckBoxContainer>
                  <CheckBox id="non-exist" />
                  <FilterCheckBoxLabel htmlFor="non-exist">
                    <FilterCheckLabelBox>
                      <CheckIcon />
                    </FilterCheckLabelBox>
                    없음
                  </FilterCheckBoxLabel>
                </FilterCheckBoxContainer>
              </FilterInputContainer>
            </FilterIconContainer>

            <FilterIconContainer>
              <DiversifyIcon />
              <FilterIconDescription>대학 종류</FilterIconDescription>
              <FilterInputContainer>
                <FilterCheckBoxContainer>
                  <CheckBox id="four" />
                  <FilterCheckBoxLabel htmlFor="four">
                    <FilterCheckLabelBox>
                      <CheckIcon />
                    </FilterCheckLabelBox>
                    4년제
                  </FilterCheckBoxLabel>
                </FilterCheckBoxContainer>
                <FilterCheckBoxContainer>
                  <CheckBox id="two" />
                  <FilterCheckBoxLabel htmlFor="two">
                    <FilterCheckLabelBox>
                      <CheckIcon />
                    </FilterCheckLabelBox>
                    전문대
                  </FilterCheckBoxLabel>
                </FilterCheckBoxContainer>
                <FilterCheckBoxContainer>
                  <CheckBox id="institute" />
                  <FilterCheckBoxLabel htmlFor="institute">
                    <FilterCheckLabelBox>
                      <CheckIcon />
                    </FilterCheckLabelBox>
                    어학원
                  </FilterCheckBoxLabel>
                </FilterCheckBoxContainer>
              </FilterInputContainer>
            </FilterIconContainer>
          </FilterContainer>
        </SearchSection>
      </SearchSectionContainer>
      <UnivListSection>
        <UnivListTitle>대학 리스트</UnivListTitle>
        {univList.map((univItem) => (
          <UnivItem key={univItem.name} {...univItem} />
        ))}
      </UnivListSection>
      <UnivListPagination>
        <UnivListPrevButton />
        {1}
        <UnivListNextButton />
      </UnivListPagination>
    </>
  );
};

export default RecommendListPage;
