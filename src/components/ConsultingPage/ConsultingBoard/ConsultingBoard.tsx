/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  SubTitle,
} from '@components/ConsultingPage';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import {
  ConsultingBoardContainer,
  SubTitleWrap,
  WriteButton,
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
  changeLang: (s: string) => void;
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

const ConsultingBoard: React.FC<ConsultingBoardProps> = ({ t, lang, changeLang }) => {
  const [offset, setOffset] = useState(1);
  const convertId = (id: number) => String(id).padStart(5, '0');
  let bEmptyData = true;
  let maxPage = 1;
  let user_qna = [];

  const getMyQnA = async () => {
    const QnAs = API.getMyQnA(offset);
    return QnAs;
  };

  const [loading, resolved, error] = usePromise(getMyQnA, []);

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

  const userConsultTable = user_qna.map(({
    id, title, is_answer, uploaded_at,
  }: userConsultDataType) => (
    <BoardTr key={id}>
      <BoardTd>
        { convertId(id) }
      </BoardTd>
      <BoardTd>
        <TitleWrap>
          { title }
          { is_answer ? <CompleteLabel> 답변완료 </CompleteLabel> : null}
        </TitleWrap>
      </BoardTd>
      <BoardTd>
        { uploaded_at }
      </BoardTd>
    </BoardTr>
  ));

  return (
    <ConsultingBoardContainer>
      <SubTitleWrap>
        <SubTitle> 1:1 상담 내역 </SubTitle>
        <WriteButton> 글쓰기 </WriteButton>
      </SubTitleWrap>
      <BoardTable>
        <BoardTHead>
          <BoardTHeadTr>
            <BoardTh width="10%"> 번호 </BoardTh>
            <BoardTh width="78%"> 제목 </BoardTh>
            <BoardTh width="12%"> 등록일 </BoardTh>
          </BoardTHeadTr>
        </BoardTHead>
        <BoardTBody>
          {bEmptyData
            ? (
              <BoardEmptyTr>
                <BoardEmptyMessage colSpan="3"> 나의 1:1 상담 내역이 없습니다. </BoardEmptyMessage>
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
