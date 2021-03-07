/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { SubTitle } from '@components/ConsultingPage';
import Button from '@components/Shared/Button/Button';
import { useRouter } from 'next/router';
import {
  DetailFormContainer,
  FormWrapper,
  WriteTable,
  Tr,
  Td,
  TableHeader,
  BoldText,
  RadioButton,
  RadioLabel,
  RadioWrap,
  Flexbox,
  Title,
  ContentArea,
  ButtonWrap,
} from './DetailForm.style';

interface DetailFormProps {
  t: (s: string) => string;
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

const mockData = {
  id: 0,
  user_id: 0,
  type: '',
  title: '',
  contents: '',
  is_answer: true,
  uploaded_at: '',
  answer: '',
};

const DetailForm: React.FC<DetailFormProps> = ({ t }) => {
  const [data, setData] = useState<userConsultDataType>(mockData);
  const router = useRouter();

  useEffect(() => {
    const url = window.location.search.substr(6);
    setData(JSON.parse(decodeURI(url)));
  }, []);

  console.log(data);

  return (
    <DetailFormContainer>
      <SubTitle>1:1 상담</SubTitle>
      <FormWrapper name="consultForm">
        <WriteTable>
          <Tr>
            <TableHeader>
              <Flexbox>
                <BoldText> 상담 분류 </BoldText>
              </Flexbox>
            </TableHeader>
            <Td>
              <RadioWrap>
                <RadioLabel htmlFor="Counseling_for_Studying_in_Korea" active={data.type === '한국 유학 상담'}>
                  <RadioButton type="radio" name="consult-type" id="Counseling_for_Studying_in_Korea" value="한국 유학 상담" checked={data.type === '한국 유학 상담'} onChange={() => false} />
                  한국 유학 상담
                </RadioLabel>
                <RadioLabel htmlFor="Admission_Solution_Consultation" active={data.type === '입학솔루션 상담'}>
                  <RadioButton type="radio" name="consult-type" id="Admission_Solution_Consultation" value="입학솔루션 상담" checked={data.type === '입학솔루션 상담'} onChange={() => false} />
                  입학솔루션 상담
                </RadioLabel>
                <RadioLabel htmlFor="Payment_and_Refund" active={data.type === '결제 및 환불'}>
                  <RadioButton type="radio" name="consult-type" id="Payment_and_Refund" value="결제 및 환불" checked={data.type === '결제 및 환불'} onChange={() => false} />
                  결제 및 환불
                </RadioLabel>
                <RadioLabel htmlFor="etc" active={data.type === '기타 문의'}>
                  <RadioButton type="radio" name="consult-type" id="etc" value="기타 문의" checked={data.type === '기타 문의'} onChange={() => false} />
                  기타 문의
                </RadioLabel>
              </RadioWrap>
            </Td>
          </Tr>
          <Tr>
            <TableHeader>
              <Flexbox>
                <BoldText> 제목 </BoldText>
              </Flexbox>
            </TableHeader>
            <Td>
              <Title>{data.title}</Title>
            </Td>
          </Tr>
          <Tr>
            <TableHeader>
              <Flexbox>
                <BoldText> 내용 </BoldText>
              </Flexbox>
            </TableHeader>
            <Td>
              <ContentArea value={data.contents.replaceAll('<br>', '\r\n')} readOnly />
            </Td>
          </Tr>
          <Tr>
            <TableHeader>
              <Flexbox>
                <BoldText> 1:1 답변 </BoldText>
              </Flexbox>
            </TableHeader>
            <Td>
              <ContentArea value={data.answer.replaceAll('<br>', '\r\n')} readOnly />
            </Td>
          </Tr>
        </WriteTable>
      </FormWrapper>
      <ButtonWrap>
        <Button onClick={() => { router.replace('/consult'); }}> 목록보기 </Button>
      </ButtonWrap>
    </DetailFormContainer>
  );
};

export default DetailForm;
