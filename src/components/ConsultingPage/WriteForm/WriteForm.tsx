/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from 'react';
import { SubTitle } from '@components/ConsultingPage';
import {
  WriteFormContainer,
  FormWrapper,
  WriteTable,
  Tr,
  Td,
  TableHeader,
  StarText,
  BoldText,
  RadioButton,
  RadioLabel,
  RadioWrap,
  Flexbox,
  TitleInputBox,
  ContentArea,
  ButtonWrap,
} from './WriteForm.style';
import Button from '@components/Shared/Button/Button';
import API from '@util/api';
import { useRouter } from 'next/router';

interface WriteFormProps {
  t: (s: string) => string;
}

const WriteForm: React.FC<WriteFormProps> = ({ t }) => {
  const RadioWrapRef = useRef<HTMLDivElement>(null);
  const [bComplete, setComplete] = useState<boolean>(false);
  const router = useRouter();

  const handlingOnChange = () => {
      const $form = document.consultForm;
      const bEmptyRadio = $form.['consult-type'].value !== ""
      const bEmptyTitle = $form.['title'].value !== ""
      const bEmptyContent = $form.['content'].value !== ""

      if(bEmptyRadio && bEmptyTitle && bEmptyContent) setComplete(true);
      else setComplete(false);
  } // 나중에 쓰로틀링 걸면 좋을듯

  const handlingSubmit = async () => {
      const $form = document.consultForm;
      const data = await API.postMyQnA(
          $form.['consult-type'].value,
          $form.['title'].value,
          $form.['content'].value
      )
      if(data!=={}) router.replace("/consult")
      else alert("API 요청 에러")
  }

  const handlingRadioClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== RadioWrapRef.current) {
      const $form = document.consultForm;
      const radioNodes = Array.from($form.['consult-type']);

      if(radioNodes.includes(e.target)) {
        radioNodes.map((node:any) => {
            if (node === e.target) {
                node.checked = true;
                node.parentNode.style.color = '#DF4D3D';
            }
            else node.parentNode.style.color = 'black';
        })
      }
    }
  };
  return (
    <WriteFormContainer>
      <SubTitle>1:1 상담</SubTitle>
      <FormWrapper name="consultForm" onChange={handlingOnChange}>
        <WriteTable>
          <Tr>
            <TableHeader>
              <Flexbox>
                <BoldText> 상담 분류 </BoldText>
                <StarText>*</StarText>
              </Flexbox>
            </TableHeader>
            <Td>
              <RadioWrap onClick={handlingRadioClick} ref={RadioWrapRef}>
                <RadioLabel htmlFor="Counseling_for_Studying_in_Korea">
                  <RadioButton type="radio" name="consult-type" id="Counseling_for_Studying_in_Korea" value="한국 유학 상담"/>
                  한국 유학 상담
                </RadioLabel>
                <RadioLabel htmlFor="Admission_Solution_Consultation">
                  <RadioButton type="radio" name="consult-type" id="Admission_Solution_Consultation" value="입학솔루션 상담"/>
                  입학솔루션 상담
                </RadioLabel>
                <RadioLabel htmlFor="Payment_and_Refund">
                  <RadioButton type="radio" name="consult-type" id="Payment_and_Refund" value="결제 및 환불"/>
                  결제 및 환불
                </RadioLabel>
                <RadioLabel htmlFor="etc">
                  <RadioButton type="radio" name="consult-type" id="etc" value="기타 문의"/>
                  기타 문의
                </RadioLabel>
              </RadioWrap>
            </Td>
          </Tr>
          <Tr>
            <TableHeader>
              <Flexbox>
                <BoldText> 제목 </BoldText>
                <StarText>*</StarText>
              </Flexbox>
            </TableHeader>
            <Td>
              <TitleInputBox name="title" placeholder="제목을 입력해주세요." />
            </Td>
          </Tr>
          <Tr>
            <TableHeader>
              <Flexbox>
                <BoldText> 내용 </BoldText>
                <StarText>*</StarText>
              </Flexbox>
            </TableHeader>
            <Td>
              <ContentArea name="content"/>
            </Td>
          </Tr>
        </WriteTable>
      </FormWrapper>
      <ButtonWrap>
        <Button onClick={()=>{
            bComplete? handlingSubmit():
            alert("내용을 입력해주세요.");
        }} active={bComplete}> 작성하기 </Button>
      </ButtonWrap>
    </WriteFormContainer>
  );
};

export default WriteForm;
