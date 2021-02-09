import React from 'react';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Header from '@components/Shared/Header/Header';
import StepHeader from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import {
  BlockHeader,Block,EmptyText,
  ReadyButton,
  SelectContainer,
  Tap,
  TapContainer,
  TapItem
} from '@components/SolutionPage/Common/Common.style';
import {Test} from '@views/SolutionPage/SolutionSelectPage/SolutionSelectPage.style';

interface tap {
  name: string;
  index : number;
}

const taps: Array<tap> = [
  {
    name: '인문계열',
    index: 1,
  },
  {
    name: '자연계열',
    index: 2,
  },
  {
    name: '예체능계열',
    index: 3,
  }
];
const SolutionSelectPage: NextPage = () => {
  return (
    <DefaultLayout>
      <Header background="light" position="relative" />
      <StepHeader step={1}/>
      <Block>
        <BlockHeader>입학 계열 선택</BlockHeader>
        <EmptyText>
          먼저 대학 선택 버튼을 눌러 입학을 준비할 대학교를 선택해주세요
        </EmptyText>
      </Block>
      <Block>
        <BlockHeader>학과 선택</BlockHeader>
        <SelectContainer>
        <TapContainer>
          <Tap>
              {taps.map(({ name, index }) => (
                  <TapItem key={index} isViewTap={index===1}>
                      {name}
                  </TapItem>
              ))}
          </Tap>
        </TapContainer>
        </SelectContainer>
        <EmptyText>
          먼저 대학교와 입학 계열을 선택해주세요.
        </EmptyText>
      </Block>
      <Block>
        <BlockHeader>제출서류 안내</BlockHeader>
        <EmptyText>
          먼저 입학할 학과를 선택해 주세요.
        </EmptyText>
      </Block>
      <Block>
        <ReadyButton isReady={false}>다음단계</ReadyButton>
      </Block>
    </DefaultLayout>
  );
};

export default SolutionSelectPage;
