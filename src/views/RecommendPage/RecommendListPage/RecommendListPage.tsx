import * as React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Header from '@components/Shared/Header/Header';
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
  FilterInputContainer,
  CheckBox,
  FilterCheckBoxContainer,
  FilterCheckBoxLabel,
  FilterCheckLabelBox,
  UnivListSection,
  UnivListTitle,
  UnivListPagination,
  UnivListPrevButton,
  UnivListNextButton,
} from '@views/RecommendPage/RecommendListPage/RecommendListPage.style';
import UnivItem, { UnivInfo } from '@components/RecommendPage/UnivItem/UnivItem';
import LocationFilter, { KoreaLocation } from '@components/RecommendPage/LocationFilter/LocationFilter';
import TuitionFilter from '@components/RecommendPage/TuitionFilter/TuitionFilter';
import ExamFilter from '@components/RecommendPage/ExamFilter/ExamFilter';
import { useRouter } from 'next/router';
import CheckIcon from '../../../assets/check.svg';
import DiversifyIcon from '../../../assets/diversify.svg';
import GrantIcon from '../../../assets/grant.svg';

const useStateWithToggle = (initialState: boolean) => {
  const [toggle, setToggle] = React.useState<boolean>(initialState);

  return [toggle, () => setToggle((state) => !state), setToggle] as const;
};

interface FilterValue {
  location: Array<KoreaLocation>;
  tuition: number | null;
  topik: Array<number>;
  has_own_exam: boolean | null;
  has_scholarship: boolean | null;
  category: Array<'UN' | 'CG' | 'IT'>;
}

const filterInitialValue = {
  location: [],
  tuition: null,
  topik: [],
  has_own_exam: null,
  has_scholarship: null,
  category: [],
};

interface SearchValue {
  word: string;
}

const changeQueryToBoolParamsValue = (value: string | string[] | undefined): boolean | null => {
  if (value === '' || value === undefined) { return null; }
  return value === 'true';
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  let univListResponse: Response;
  const { query } = context;
  const searchParams: SearchValue = {
    word: encodeURI(String(query.search_word ?? "")),
  };
  const filterParams: FilterValue = {
    location: query.location
      ? String(query.location).split(',') as Array<KoreaLocation>
      : filterInitialValue.location,
    tuition: query.tuition ? Number(query.tuition) : filterInitialValue.tuition,
    topik: query.topik ? String(query.topik).split(',').map(Number) : filterInitialValue.topik,
    has_own_exam: changeQueryToBoolParamsValue(query.has_own_exam),
    has_scholarship: changeQueryToBoolParamsValue(query.has_scholarship),
    category: query.category
      ? String(query.category).split(',') as Array<'UN' | 'CG' | 'IT'>
      : filterInitialValue.category,
  };
  if (context.query.hasOwnProperty('search_word')) {
    univListResponse = await fetch(
      `${process.env.API_PATH}api/?action=search&params=${
        JSON.stringify(
          Object.assign(
            searchParams,
            { page: query.page ? String(query.page) : '1' },
          ),
        )}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
  } else {
    univListResponse = await fetch(
      `${process.env.API_PATH}api/?action=filter_search&params=${
        JSON.stringify(
          Object.assign(
            filterParams,
            { page: query.page ? String(query.page) : '1' },
          ),
        )}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
  }
  const univListData = await univListResponse.json();
  const univList = (univListData.univs ?? []).map(
      (univ: { photos: any[]; }) => ({
        ...univ,
        logo: univ.photos.find(photoInfo => photoInfo.photo_category === "logo")?.file,
        thumbnail: univ.photos.find(photoInfo => photoInfo.photo_category === "main_photo")?.file
    })
  )
  return {
    props: {
      filterParams,
      searchParams,
      univList,
      pageInfo: univListData.pages ?? {
        current_page: 1,
        per_page: 5,
        max_page: 1
      },
      hasQuery: query.hasOwnProperty('page'),
    },
  };
};

interface RecommendListPageProps {
  filterParams: FilterValue;
  searchParams: SearchValue;
  univList: Array<UnivInfo>;
  pageInfo: {
    current_page: string;
    per_page: number;
    max_page: number;
  },
  hasQuery: boolean;
}

const RecommendListPage: NextPage<RecommendListPageProps> = ({
  filterParams,
  searchParams,
  univList,
  pageInfo,
  hasQuery,
}) => {
  const router = useRouter();
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [filterShow, toggleFilterShow] = useStateWithToggle(false);

  // TODO: Change to mobx
  const [locationValue, setLocationValue] = React.useState<Array<KoreaLocation>>(filterParams.location);
  const [tuitionValue, setTuitionValue] = React.useState<number | null>(filterParams.tuition);
  const [topikValue, setTopikValue] = React.useState<Array<number>>(filterParams.topik);
  const [selfTestValue, setSelfTestValue] = React.useState<boolean | null>(filterParams.has_own_exam);
  const [scholarshipValue, setScholarshipValue] = React.useState<boolean | null>(filterParams.has_scholarship);
  const onChangeScholarShipValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if ((target.value === 'true') === scholarshipValue) {
      setScholarshipValue(null);
      return
    }
      setScholarshipValue((target.value === 'true'));
  };
  const [univValue, setUnivValue] = React.useState<Array<string>>(filterParams.category);
  const onChangeUnivValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (univValue.includes(target.value)) {
      const targetIndex = univValue.indexOf(target.value);
      const newUnivValue = Array.from(univValue);
      newUnivValue.splice(targetIndex, 1);
      setUnivValue(newUnivValue);
    } else {
      setUnivValue((state) => state.concat(target.value));
    }
  };

  const [page, setPage] = React.useState<number>(Number(pageInfo.current_page));

  React.useEffect(() => {
    if (!hasQuery
      && locationValue.length === 0
      && tuitionValue === filterInitialValue.tuition
      && topikValue.length === 0
      && selfTestValue === filterInitialValue.has_own_exam
      && scholarshipValue === filterInitialValue.has_scholarship
      && univValue.length === 0
      && page === 1) return;
    const tuition = tuitionValue || '';
    const hasOwnExam = selfTestValue !== null ? selfTestValue : '';
    const hasScholarship = scholarshipValue !== null ? scholarshipValue : '';
    router
      .push(`/recommend?location=${locationValue}&tuition=${tuition}&topik=${topikValue}&has_own_exam=${hasOwnExam}&has_scholarship=${hasScholarship}&category=${univValue}&page=${page}`)
      .then(() => window.scrollTo(0, 0));
  }, [locationValue, tuitionValue, topikValue, selfTestValue, scholarshipValue, univValue, page]);

  // TODO: Error on pagination please use mobx
  const paginatePrevious = () => {
    if (pageInfo.current_page === '1') return;
    setPage((state) => state - 1);
  };

  const paginateNext = () => {
    if (pageInfo.current_page === String(pageInfo.max_page)) return;
    setPage((state) => state + 1);
  };

  const clickSearchButton = () => {
    const searchWord = searchInputRef?.current?.value;
    if(searchWord) {

      router.push(`/recommend?search_word=${searchWord}&page=1`);
    }
  }

  return (
    <>
      <Header background="dark" position="absolute" />
      <SearchSectionContainer>
        <SearchSection>
          모든 대학을 알려드립니다
          <SearchBarContainer>
            <SearchBar>
              {console.log(searchParams.word ?? "sibal")}
              <SearchInput ref={searchInputRef} defaultValue={decodeURI(searchParams.word)} />
              <SearchButton onClick={clickSearchButton}>
                <SearchIcon src="/images/search.png" />
              </SearchButton>
            </SearchBar>
            <FilterShowButton onChange={toggleFilterShow} />
            <FilterShowLabel>
              <FilterShowIcon />
            </FilterShowLabel>
          </SearchBarContainer>
          {/* TODO: Export to another components */}
          <FilterContainer show={filterShow}>
            <LocationFilter filterValue={locationValue} setFilterValue={setLocationValue} />

            <TuitionFilter filterValue={tuitionValue} setFilterValue={setTuitionValue} />

            <ExamFilter
              topikValue={topikValue}
              setTopikValue={setTopikValue}
              selfTestValue={selfTestValue}
              setSelfTestValue={setSelfTestValue}
            />

            <FilterIconContainer>
              <GrantIcon />
              <FilterIconDescription>외국인 장학금</FilterIconDescription>
              <FilterInputContainer>
                <FilterCheckBoxContainer>
                  <CheckBox
                    id="exist"
                    value="true"
                    checked={scholarshipValue === true}
                    onChange={onChangeScholarShipValue}
                  />
                  <FilterCheckBoxLabel htmlFor="exist">
                    <FilterCheckLabelBox>
                      <CheckIcon />
                    </FilterCheckLabelBox>
                    있음
                  </FilterCheckBoxLabel>
                </FilterCheckBoxContainer>
                <FilterCheckBoxContainer>
                  <CheckBox
                    id="non-exist"
                    value="false"
                    checked={scholarshipValue === false}
                    onChange={onChangeScholarShipValue}
                  />
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
                  <CheckBox
                    id="four"
                    value="UN"
                    checked={univValue.includes('UN')}
                    onChange={onChangeUnivValue}
                  />
                  <FilterCheckBoxLabel htmlFor="four">
                    <FilterCheckLabelBox>
                      <CheckIcon />
                    </FilterCheckLabelBox>
                    4년제
                  </FilterCheckBoxLabel>
                </FilterCheckBoxContainer>
                <FilterCheckBoxContainer>
                  <CheckBox
                    id="two"
                    value="CG"
                    checked={univValue.includes('CG')}
                    onChange={onChangeUnivValue}
                  />
                  <FilterCheckBoxLabel htmlFor="two">
                    <FilterCheckLabelBox>
                      <CheckIcon />
                    </FilterCheckLabelBox>
                    전문대
                  </FilterCheckBoxLabel>
                </FilterCheckBoxContainer>
                <FilterCheckBoxContainer>
                  <CheckBox
                    id="institute"
                    value="IT"
                    checked={univValue.includes('IT')}
                    onChange={onChangeUnivValue}
                  />
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
        {univList.map((univItem, index) => (
          <UnivItem key={index} {...univItem} />
        ))}
      </UnivListSection>
      <UnivListPagination>
        <UnivListPrevButton onClick={paginatePrevious} />
        {pageInfo.current_page}
        <UnivListNextButton onClick={paginateNext} />
      </UnivListPagination>
    </>
  );
};

export default RecommendListPage;
