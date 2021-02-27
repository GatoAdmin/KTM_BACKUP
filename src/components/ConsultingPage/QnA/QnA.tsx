import React, { useState } from 'react';
import {
  SubTitle, Tab, TitleBar, Accordion,
} from '@components/ConsultingPage';
import {
  QnAContainer,
} from './QnA.style';
import i18nResource from '../../../assets/i18n/consultQnA.json';

interface QnAProps {
  t: (s: string) => string;
  lang: string;
  changeLang: (s: string) => void;
}

const QnA: React.FC<QnAProps> = ({ t, lang, changeLang }) => {
  const [index, setIndex] = useState(0);

  const questions = [
    i18nResource.consult.map((question) => <Accordion data={question} />),
    i18nResource.solution.map((question) => <Accordion data={question} />),
    i18nResource.payment.map((question) => <Accordion data={question} />),
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
