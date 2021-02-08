import React from 'react';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Header from '@components/Shared/Header/Header';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import {Test} from '@views/SolutionPage/SolutionSelectPage/SolutionSelectPage.style';

const SolutionSelectPage: NextPage = () => {
//   const filterRefObject = useFilterRefObject();

//   const filterButtonRef = React.useRef<HTMLDivElement>(null);
//   const [isFilterShow, toggleIsFilterShow] = useVisible(filterButtonRef);
//   const { univList, loadUnivList, mutate } = useUnivListData(filterParams, initialUnivList, maxPage);
//   const updateUrlQuery = usePushRouterWithFiiterValue(filterRefObject, mutate);

//   const univListLoadRef = React.useRef<HTMLDivElement>(null);
//   const isTriggerLoadUnivList = useIntersection(univListLoadRef, { threshold: 1 });
//   React.useEffect(() => {
//     if (isTriggerLoadUnivList) {
//       loadUnivList();
//     }
//   }, [isTriggerLoadUnivList]);

  return (
    <DefaultLayout>
      <Header background="light" position="relative" />
        <Test>
            솔루션 페이지
        </Test>
    </DefaultLayout>
  );
};

export default SolutionSelectPage;
