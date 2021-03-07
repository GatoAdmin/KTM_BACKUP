/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  SubTitle, Tab, TitleBar, Accordion,
} from '@components/ConsultingPage';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import {
  QnAContainer,
} from './QnA.style';

interface QnAProps {
  t: (s: string) => string;
  lang: string;
  changeLang: (s: string) => void;
}

interface QuestionType {
  id: number;
  category: string;
  question_title: string;
  vn_question_title: string | null;
  question_content: string;
  vn_question_content: string | null;
}

const QnA: React.FC<QnAProps> = ({ t, lang, changeLang }) => {
  const [index, setIndex] = useState(0);

  const getQnAs = async () => {
    const QnAs = await API.getQnAList();
    return QnAs;
  };

  const [loading, resolved, error] = usePromise(getQnAs, []);

  if (loading) return <> </>; // 나중에 스피너나 빈프레임 넣으면 좋을 것 같습니다 ㅎㅎ
  if (error) window.alert('API 오류');
  if (!resolved) return null;

  const { consult, solution, payment } = resolved;

  const questions = [
    consult.map((question: QuestionType) => <Accordion key={question.id} data={question} />),
    solution.map((question: QuestionType) => <Accordion key={question.id} data={question} />),
    payment.map((question: QuestionType) => <Accordion key={question.id} data={question} />),
  ];

  return (
    <QnAContainer>
      <SubTitle> 자주 묻는 질문 </SubTitle>
      <Tab index={index} setIndex={setIndex} />
      <TitleBar />
      {questions[index]}
    </QnAContainer>
  );
};
export default QnA;
