import React from 'react';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSWRInfinite, responseInterface } from 'swr';
import Header from '@components/Shared/Header/Header';
import {
  FilterModalContainer,
  FilterSection,
  SearchButton,
  SearchFilterButton,
  SearchFilterContainer,
  SearchInput,
  SearchInputContainer,
  SearchSectionContainer,
  SearchSectionContent,
  SearchSectionTitle,
  UnivListLoadTrigger,
  UnivListSection,
  UnivListTitle,
} from '@views/RecommendPage/RecommendListPage/RecommendListPage.style';
import SearchIcon from '@assets/svg/search_icon.svg';
import FilterIcon from '@assets/svg/filter_icon.svg';
import useVisible from '@util/hooks/useVisible';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import UnivItem, { UnivInfo } from '@components/RecommendPage/UnivItem/UnivItem';
import LocationFilter, {
  KoreaLocation,
  LocationFilterRef,
} from '@components/RecommendPage/LocationFilter/LocationFilter';
import TuitionFilter, { TuitionFilterRef } from '@components/RecommendPage/TuitionFilter/TuitionFilter';
import ExamFilter, { ExamFilterRef } from '@components/RecommendPage/ExamFilter/ExamFilter';
import ScholarshipFilter, { ScholarShipFilterRef } from '@components/RecommendPage/ScholarshipFilter/ScholarshipFilter';
import CategoryFilter, {
  CategoryFilterRef,
  UnivCategory,
} from '@components/RecommendPage/CategoryFilter/CategoryFilter';
import useIntersection from '@util/hooks/useInteraction';

interface FilterValue {
  location: Array<KoreaLocation>;
  tuition: number | null;
  topik: Array<number>;
  has_own_exam: boolean | null;
  has_scholarship: boolean | null;
  category: Array<UnivCategory>;
  word: string;
  // sort_by: string;
}

const filterInitialValue = {
  location: [],
  tuition: null,
  topik: [],
  has_own_exam: null,
  has_scholarship: null,
  category: [],
};

const fetchUnivList = (url: string) => axios.get(url)
  .then(
    (res) => {
      const {
        univs,
        pages,
      }: {
          univs: Array<{
            univ_code: string;
            tuition: number;
            kor_name: string;
            eng_name: string;
            category: UnivCategory;
            kor_short_address: string;
            photos: {
              photo_category: string;
              file: string;
            }[];
            topik: string;
          }>,
          pages: {
            max_page: number;
          }
        } = res.data;

      return {
        univList: univs.map((value) => ({
          id: value.univ_code,
          name: value.kor_name,
          nameEng: value.eng_name,
          city: value.kor_short_address,
          category: value.category,
          tuition: value.tuition,
          topik: value.topik,
          thumbnail: value.photos.find((photoInfo) => photoInfo.photo_category === 'main_photo')?.file as string ?? null,
        })),
        maxPage: pages.max_page,
      };
    },
  );

const changeQueryToBoolParamsValue = (value: string | string[] | undefined): boolean | null => {
  if (value === '' || value === undefined) { return null; }
  return value === 'true';
};

interface RecommendListPageProps {
  filterParams: FilterValue;
  initialUnivList: Array<UnivInfo>;
  maxPage: number;
}

export const getServerSideProps: GetServerSideProps<RecommendListPageProps> = async (context) => {
  const { query } = context;
  const filterParams: FilterValue = {
    location: query.location
      ? String(query.location).split(',') as Array<KoreaLocation>
      : filterInitialValue.location,
    tuition: query.tuition ? Number(query.tuition) : filterInitialValue.tuition,
    topik: query.topik ? String(query.topik).split(',').map(Number) : filterInitialValue.topik,
    has_own_exam: changeQueryToBoolParamsValue(query.has_own_exam),
    has_scholarship: changeQueryToBoolParamsValue(query.has_scholarship),
    category: query.category
      ? String(query.category).split(',') as Array<UnivCategory>
      : filterInitialValue.category,
    word: query.word ? String(query.word) : '',
  };
  let responseUnivList;
  try {
    responseUnivList = await fetchUnivList(`${process.env.API_PATH}api/?action=filter_search&params=${
      JSON.stringify(
        Object.assign(
          filterParams,
          { page: 1 },
        ),
      )}`);
  } catch {
    responseUnivList = {};
  }
  return {
    props: {
      filterParams,
      initialUnivList: responseUnivList.univList ?? [],
      maxPage: responseUnivList.maxPage ?? 0,
    },
  };
};

interface FilterRefObject {
  location: React.RefObject<LocationFilterRef>;
  tuition: React.RefObject<TuitionFilterRef>;
  exam: React.RefObject<ExamFilterRef>;
  scholarship: React.RefObject<ScholarShipFilterRef>;
  category: React.RefObject<CategoryFilterRef>;
  searchInput: React.RefObject<HTMLInputElement>;
}

const useFilterRefObject = (): FilterRefObject => {
  const location = React.useRef<LocationFilterRef>(null);
  const tuition = React.useRef<TuitionFilterRef>(null);
  const exam = React.useRef<ExamFilterRef>(null);
  const scholarship = React.useRef<ScholarShipFilterRef>(null);
  const category = React.useRef<CategoryFilterRef>(null);
  const searchInput = React.useRef<HTMLInputElement>(null);

  return {
    location,
    tuition,
    exam,
    scholarship,
    category,
    searchInput,
  };
};

const useUnivListData = (filterParams: FilterValue, initialUnivList: Array<UnivInfo>, maxPage: number) => {
  const getKey = (index: number) => `${process.env.API_PATH}api/?action=filter_search&params=${JSON.stringify(Object.assign(filterParams, { page: index + 1 }))}`;
  const {
    data, size, setSize, mutate,
  } = useSWRInfinite(
    getKey,
    (url) => fetchUnivList(url),
    {
      initialData: [{
        univList: initialUnivList,
        maxPage,
      }],
    },
  );
  const loadUnivList = () => {
    setSize(size + 1);
  };

  return {
    univList: data ? data.map((value) => value.univList).flat(2) : [],
    loadUnivList,
    mutate,
  };
};

// TODO: Update with Types for filter value
export interface UpdateUrlQueryFunction {
  (propertyKey: string,
   newPropertyValue: Array<KoreaLocation> | Array<number> | number | Array<UnivCategory> | boolean | null)
    : void;
}

interface SWRData {
  univList: Array<UnivInfo>;
  maxPage: number;
}

const usePushRouterWithFiiterValue = ({
  location,
  tuition,
  exam,
  scholarship,
  category,
  searchInput,
}: FilterRefObject,
mutate: responseInterface<Array<SWRData>, unknown>['mutate']): UpdateUrlQueryFunction => {
  const router = useRouter();
  return (propertyKey, newPropertyValue) => {
    const queryUrlObject = {
      location: String(location.current?.value),
      tuition: tuition.current?.value,
      topik: String(exam.current?.topikValue),
      exam: exam.current?.testValue,
      scholarship: scholarship.current?.value,
      category: String(category.current?.value),
      word: searchInput.current?.value,
      [propertyKey]: Array.isArray(newPropertyValue) ? String(newPropertyValue) : newPropertyValue,
    };
    router
      .replace({
        pathname: '/recommend',
        query: queryUrlObject,
      }, undefined, { shallow: true });
    mutate();
  };
};

const RecommendListPage: NextPage<RecommendListPageProps> = ({
  filterParams,
  initialUnivList,
  maxPage,
}) => {
  const filterRefObject = useFilterRefObject();

  const filterButtonRef = React.useRef<HTMLDivElement>(null);
  const [isFilterShow, toggleIsFilterShow] = useVisible(filterButtonRef);
  const { univList, loadUnivList, mutate } = useUnivListData(filterParams, initialUnivList, maxPage);
  const updateUrlQuery = usePushRouterWithFiiterValue(filterRefObject, mutate);

  const univListLoadRef = React.useRef<HTMLDivElement>(null);
  const isTriggerLoadUnivList = useIntersection(univListLoadRef, { threshold: 1 });
  React.useEffect(() => {
    if (isTriggerLoadUnivList) {
      loadUnivList();
    }
  }, [isTriggerLoadUnivList]);

  return (
    <DefaultLayout>
      <Header background="dark" position="absolute" />
      <SearchSectionContainer>
        <SearchSectionTitle>
          모든 대학을 알려드립니다
        </SearchSectionTitle>
        <SearchSectionContent>
          <SearchFilterContainer ref={filterButtonRef}>
            <SearchFilterButton onClick={toggleIsFilterShow}>
              <FilterIcon />
            </SearchFilterButton>
            <FilterModalContainer show={isFilterShow}>
              <FilterSection>
                <LocationFilter
                  ref={filterRefObject.location}
                  updateUrlQuery={updateUrlQuery}
                  initialLocationValue={filterParams.location}
                />
              </FilterSection>
              <FilterSection>
                <TuitionFilter
                  ref={filterRefObject.tuition}
                  updateUrlQuery={updateUrlQuery}
                  initialTuitionValue={filterParams.tuition}
                />
              </FilterSection>
              <FilterSection>
                <ExamFilter
                  ref={filterRefObject.exam}
                  updateUrlQuery={updateUrlQuery}
                  initialTopikValue={filterParams.topik}
                  initialTestValue={filterParams.has_own_exam}
                />
              </FilterSection>
              <FilterSection>
                <ScholarshipFilter
                  ref={filterRefObject.scholarship}
                  updateUrlQuery={updateUrlQuery}
                  initialScholarshipValue={filterParams.has_scholarship}
                />
              </FilterSection>
              <FilterSection>
                <CategoryFilter
                  ref={filterRefObject.category}
                  updateUrlQuery={updateUrlQuery}
                  initialCategoryValue={filterParams.category}
                />
              </FilterSection>
            </FilterModalContainer>
          </SearchFilterContainer>

          <SearchInputContainer>
            <SearchInput ref={filterRefObject.searchInput} />
            <SearchButton>
              <SearchIcon />
            </SearchButton>
          </SearchInputContainer>
        </SearchSectionContent>
      </SearchSectionContainer>
      <UnivListSection>
        <UnivListTitle>대학 리스트</UnivListTitle>
        {univList ? univList.map((univItem) => (
          <UnivItem key={univItem.id} {...univItem} />
        )) : null}
        <UnivListLoadTrigger ref={univListLoadRef} />
      </UnivListSection>
    </DefaultLayout>
  );
};

export default RecommendListPage;
