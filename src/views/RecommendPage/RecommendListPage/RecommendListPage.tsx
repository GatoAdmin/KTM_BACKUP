import React from 'react';
import axios from 'axios';

import { GetServerSideProps, NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import { useSWRInfinite, responseInterface } from 'swr';
import Header from '@components/Shared/Header/Header';
import {
  FilterModalContainer,
  FilterSection,
  HeaderWrapper,
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
import UnivSort from '@components/RecommendPage/UnivSort/UnivSort';

import API from '@util/api';
import useIntersection from '@util/hooks/useInteraction';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/landingPage.json';
import isLogin from '@util/auth/auth';

interface FilterValue {
  location: Array<KoreaLocation>;
  tuition: number | null;
  topik: Array<number>;
  has_own_exam: boolean | null;
  has_scholarship: boolean | null;
  category: Array<UnivCategory>;
  sorted_by: string;
  word: string;
}

const filterInitialValue = {
  location: [],
  tuition: null,
  topik: [],
  has_own_exam: null,
  has_scholarship: null,
  category: [],
  sorted_by: '',
  word: '',
};

const fetchUnivList = (url: string) =>
  axios.get(url).then((res) => {
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
        has_own_exam: boolean;
      }>;
      pages: {
        max_page: number;
      };
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
        hasOwnExam: value.has_own_exam,
        thumbnail:
          (value.photos.find((photoInfo) => photoInfo.photo_category === 'main_photo')?.file as string) ?? null,
      })),
      maxPage: pages.max_page,
    };
  });

const changeQueryToBoolParamsValue = (value: string | string[] | undefined): boolean | null => {
  if (value === '' || value === undefined) {
    return null;
  }
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
      ? (String(query.location).split(',') as Array<KoreaLocation>)
      : filterInitialValue.location,
    tuition: query.tuition ? Number(query.tuition) : filterInitialValue.tuition,
    topik: query.topik ? String(query.topik).split(',').map(Number) : filterInitialValue.topik,
    has_own_exam: changeQueryToBoolParamsValue(query.has_own_exam),
    has_scholarship: changeQueryToBoolParamsValue(query.has_scholarship),
    category: query.category ? (String(query.category).split(',') as Array<UnivCategory>) : filterInitialValue.category,
    word: query.word ? String(query.word) : '',
    sorted_by: query.sorted_by ? String(query.sorted_by) : '',
  };
  let responseUnivList;
  try {
    responseUnivList = await fetchUnivList(
      `${process.env.API_PATH}api/?action=filter_search&params=${JSON.stringify(
        Object.assign(filterParams, { page: 1 }),
      )}`,
    );
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
  const getKey = (index: number) =>
    `${process.env.API_PATH}api/?action=filter_search&params=${JSON.stringify(
      Object.assign(filterParams, { page: index + 1 }),
    )}`;
  const { data, size, setSize, mutate } = useSWRInfinite(getKey, (url) => fetchUnivList(url), {
    initialData: [
      {
        univList: initialUnivList,
        maxPage,
      },
    ],
  });
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
  (
    propertyKey: string,
    newPropertyValue: Array<KoreaLocation> | Array<number> | number | Array<UnivCategory> | boolean | null,
  ): void;
}

interface SWRData {
  univList: Array<UnivInfo>;
  maxPage: number;
}

const usePushRouterWithFiiterValue = (
  { location, tuition, exam, scholarship, category, searchInput }: FilterRefObject,
  mutate: responseInterface<Array<SWRData>, unknown>['mutate'],
): UpdateUrlQueryFunction => {
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
    router.replace(
      {
        pathname: '/recommend',
        query: queryUrlObject,
      },
      undefined,
      // { shallow: true },
    );
    mutate();
  };
};

const RecommendListPage: NextPage<RecommendListPageProps> = ({ filterParams, initialUnivList, maxPage }) => {
  const filterRefObject = useFilterRefObject();

  const filterButtonRef = React.useRef<HTMLDivElement>(null);
  const [isFilterShow, toggleIsFilterShow] = useVisible(filterButtonRef);
  const { univList, loadUnivList, mutate } = useUnivListData(filterParams, initialUnivList, maxPage);
  const [likedUniv, setLikedUniv] = React.useState([]);
  const updateUrlQuery = usePushRouterWithFiiterValue(filterRefObject, mutate);

  const univListLoadRef = React.useRef<HTMLDivElement>(null);
  const isTriggerLoadUnivList = useIntersection(univListLoadRef, { threshold: 1 });
  React.useEffect(() => {
    if (isTriggerLoadUnivList) {
      loadUnivList();
    }
  }, [isTriggerLoadUnivList]);

  React.useEffect(() => {
    if (isLogin()) {
      API.getUserInfo().then((res) => {
        setLikedUniv(res.liked_univ);
      });
    }
  }, []);
  const { t, lang, changeLang } = useTranslate(i18nResource);

  // React.useEffect(() => {
  //   console.log(univList);
  // }, [univList]);

  const onPushHeart = (univKey: string) => {
    if (isLogin()) {
      API.pushLikeButton(univKey)
        .then((res) => {
          if (res.status === 'success') {
            if (!likedUniv.includes(univKey)) {
              setLikedUniv((prev) => [...prev, univKey]);
            } else {
              setLikedUniv((prev) => prev.filter((elem) => elem !== univKey));
            }
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert(t('warn-not-logged-in'));
      Router.push('/login');
    }
  };

  return (
    <DefaultLayout>
      <HeaderWrapper>
        <Header background="dark" t={t} lang={lang} changeLang={changeLang} />
      </HeaderWrapper>
      <SearchSectionContainer>
        <SearchSectionTitle>{t('search-section-title')}</SearchSectionTitle>
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

          <SearchInputContainer
            onSubmit={(e) => {
              e.preventDefault();
              updateUrlQuery('word', e.target[0].value);
            }}
          >
            <SearchInput ref={filterRefObject.searchInput} placeholder={t('search-section-placeholder')} />
            <SearchButton>
              <SearchIcon />
            </SearchButton>
          </SearchInputContainer>
        </SearchSectionContent>
      </SearchSectionContainer>
      <UnivListSection>
        <UnivListTitle>{t('univ-list-title')}</UnivListTitle>

        {univList
          ? univList.map((univItem) => {
              return (
                <UnivItem
                  key={`${univItem.id}${univItem.category}`}
                  {...univItem}
                  isLiked={likedUniv.includes(univItem.id)}
                  onPushHeart={onPushHeart}
                  t={t}
                />
              );
            })
          : null}
        <UnivSort updateUrlQuery={updateUrlQuery} t={t} />
        <UnivListLoadTrigger ref={univListLoadRef} />
      </UnivListSection>
    </DefaultLayout>
  );
};

export default RecommendListPage;
