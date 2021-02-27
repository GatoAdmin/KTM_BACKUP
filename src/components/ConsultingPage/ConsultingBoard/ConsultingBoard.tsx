import React, { useState } from 'react';
import {
  SubTitle, TitleBar,
} from '@components/ConsultingPage';
import {
  ConsultingBoardContainer,
  SubTitleWrap,
  WriteButton,
  BoardTable,
  BoardTh,
  BoardTr,
  BoardTd,
} from './ConsultingBoard.style';

interface ConsultingBoardProps {
  t: (s: string) => string;
  lang: string;
  changeLang: (s: string) => void;
}

const ConsultingBoard: React.FC<ConsultingBoardProps> = ({ t, lang, changeLang }) => {
  const [offset, setOffset] = useState(1);

  return (
    <ConsultingBoardContainer>
      <SubTitleWrap>
        <SubTitle> 1:1 상담 내역 </SubTitle>
        <WriteButton> 글쓰기 </WriteButton>
      </SubTitleWrap>
      <BoardTable>
        <BoardTr>
          <BoardTh width="10%"> 번호 </BoardTh>
          <BoardTh width="70%"> 제목 </BoardTh>
          <BoardTh width="20%"> 등록일 </BoardTh>
        </BoardTr>
        <TitleBar />
        <BoardTr>
          <BoardTd colSpan="3"> 나의 1:1 상담 내역이 없습니다. </BoardTd>
        </BoardTr>

        <TitleBar />
      </BoardTable>
    </ConsultingBoardContainer>
  );
};
export default ConsultingBoard;
