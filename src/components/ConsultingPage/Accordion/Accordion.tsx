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
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [bOpen, setOpen] = useState(false);

  const handlingClick = () => {
    setOpen(!bOpen);
  };

  const createAnswer = data.question_content.split(' \\n ').map((text) => (
    <Answer>
      {text}
    </Answer>
  ));

  return (
    <AccordionContainer bOpen={bOpen} onClick={handlingClick}>
      <AccordionHeader>
        <Question bOpen={bOpen}>
          {data.question_title}
        </Question>
        <DownArrow bOpen={bOpen} />
      </AccordionHeader>
      {bOpen ? (
        <AnswerWrap>
          {createAnswer}
        </AnswerWrap>
      ) : null }
    </AccordionContainer>
  );
};

export default Accordion;
