/* eslint-disable camelcase */

import React, { useState } from 'react';

import {
  AccordionContainer, Question, Answer, DownArrow, AccordionHeader, AnswerWrap,
} from './Accordion.style';

interface DataProps {
  id: number;
  category: string;
  question_title: string;
  vn_question_title: string | null;
  question_content: string;
  vn_question_content: string | null;
}

interface AccordionProps {
  data: DataProps;
  lang: string;
}

const Accordion: React.FC<AccordionProps> = ({ data, lang }) => {
  const [bopen, setOpen] = useState(false);

  const handlingClick = () => {
    setOpen(!bopen);
  };

  const createAnswer = data.question_content.split('<br>').map((text) => (
    <Answer key={text}>
      {text}
    </Answer>
  ));

  const createVnAnswer = data.vn_question_content?.split('<br>').map((text) => (
    <Answer key={text}>
      {text}
    </Answer>
  ));

  return (
    <AccordionContainer bopen={bopen ? 1 : 0} onClick={handlingClick}>
      <AccordionHeader>
        <Question bopen={bopen ? 1 : 0}>
          {lang === 'ko' ? data.question_title : data.vn_question_title}
        </Question>
        <DownArrow bopen={bopen ? 1 : 0} />
      </AccordionHeader>
      {bopen ? (
        <AnswerWrap>
          {lang === 'ko' ? createAnswer : createVnAnswer}
        </AnswerWrap>
      ) : null }
    </AccordionContainer>
  );
};

export default Accordion;
