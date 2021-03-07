/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import {
  SubTitle,
} from '@components/ConsultingPage';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import Button from '@components/Shared/Button/Button';
import isLogin from '@util/auth/auth';
import { useRouter } from 'next/router';
import {
  ConsultingBoardContainer,
  SubTitleWrap,
  BoardTable,
  BoardTh,
  BoardTr,
  BoardTd,
  BoardEmptyMessage,
  CompleteLabel,
  TitleWrap,
  BoardEmptyTr,
  PageText,
  PaginationContainer,
  LeftArrow,
  RightArrow,
  BoardTHead,
  BoardTHeadTr,
  BoardTBody,
} from './ConsultingBoard.style';

interface ConsultingBoardProps {
  t: (s: string) => string;
  lang: string;
}

interface userConsultDataType {
  id: number;
  user_id: number;
  type: string;
  title: string;
  contents: string;
  is_answer: boolean;
  uploaded_at: string;
  answer: string
}

interface pagesType {
  current_page: number;
  per_page: number;
  max_page: number;
}

interface boardTableDatatype {
  pages: pagesType;
  user_qna: Array<userConsultDataType>;
}

const ConsultingBoard: React.FC<ConsultingBoardProps> = ({ t, lang }) => {
  const [offset, setOffset] = useState(1);
  const router = useRouter();
  const convertId = (id: number) => String(id).padStart(5, '0');
  let bEmptyData = true;
  let maxPage = 1;
  let user_qna = [];

  const getMyQnA = async () => {
    const QnAs = API.getMyQnA(offset);
    return QnAs;
  };

  const handlingOnClickQuestion = (qna: userConsultDataType) => {
    router.replace(`/consult/detail/?data=${encodeURI(JSON.stringify(qna))}`);
  };

  const [loading, resolved, error] = usePromise(getMyQnA, [offset]);

  if (loading) return <> </>; // 나중에 스피너나 빈프레임 넣으면 좋을 것 같습니다 ㅎㅎ
  if (error) window.location.href = '/';
  if (!resolved) return null;

  if (resolved.user_qna !== undefined) {
    bEmptyData = resolved.user_qna.length === 0;
    maxPage = resolved.pages.max_page;
    user_qna = resolved.user_qna;
  }

  const bDisableLeftArrow = offset <= 1;
  const bDisableRightArrow = offset >= maxPage;

  const handlingLeftArrowClick = () => {
    if (bDisableLeftArrow) return;
    setOffset(offset - 1);
  };

  const handlingRightArrowClick = () => {
    if (bDisableRightArrow) return;
    setOffset(offset + 1);
  };

  const userConsultTable = user_qna.map((qna: userConsultDataType) => (
    <BoardTr key={qna.id} onClick={() => handlingOnClickQuestion(qna)}>
      <BoardTd>
        { convertId(qna.id) }
      </BoardTd>
      <BoardTd>
        <TitleWrap>
          { qna.title }
          { qna.is_answer ? (
            <CompleteLabel>
              {t('question-label')}
            </CompleteLabel>
          ) : null}
        </TitleWrap>
      </BoardTd>
      <BoardTd>
        { qna.uploaded_at }
      </BoardTd>
    </BoardTr>
  ));

  return (
    <ConsultingBoardContainer>
      <SubTitleWrap>
        <SubTitle>
          {t('one-by-one-consult-history')}
        </SubTitle>
        <Button onClick={() => {
          if (isLogin()) router.replace('/consult/write');
          else {
            alert('로그인이 필요한 서비스입니다.');
            router.replace('/login');
          }
        }}
        >
          {t('write_qna-button-text')}
        </Button>
      </SubTitleWrap>
      <BoardTable>
        <BoardTHead>
          <BoardTHeadTr>
            <BoardTh width="10%">
              {t('table-number')}
            </BoardTh>
            <BoardTh width="78%">
              {t('table-title')}
            </BoardTh>
            <BoardTh width="12%">
              {t('table-date')}
            </BoardTh>
          </BoardTHeadTr>
        </BoardTHead>
        <BoardTBody>
          {bEmptyData
            ? (
              <BoardEmptyTr>
                <BoardEmptyMessage colSpan="3">
                  {t('board-empty-message')}
                </BoardEmptyMessage>
              </BoardEmptyTr>
            ) : userConsultTable}
        </BoardTBody>
      </BoardTable>
      {bEmptyData ? (
        null
      ) : (
        <PaginationContainer>
          <PageText>
            {`${offset} / ${resolved.pages.max_page}`}
          </PageText>
          <LeftArrow disable={bDisableLeftArrow ? 1 : 0} onClick={handlingLeftArrowClick} />
          <RightArrow disable={bDisableRightArrow ? 1 : 0} onClick={handlingRightArrowClick} />
        </PaginationContainer>
      )}
    </ConsultingBoardContainer>
  );
};
export default ConsultingBoard;
