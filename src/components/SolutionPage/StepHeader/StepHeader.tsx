import React from 'react';
import Link from 'next/link';
import {
    SolutionHeader,
    StepContainer,
    Navigation,
    NavigationContainer,
    NavItem,
    UnivContainer,
    UnivSelectButton,
    ClickIcon,
} from './StepHeader.style';
import {
    EmptyText,
    ReadyButton
} from '@components/SolutionPage/Common/Common.style';

interface step {
  name: string;
  index : number;
}

const steps: Array<step> = [
  {
    name: '1. 학교 선택',
    index: 1,
  },
  {
    name: '2. 동의 및 결제',
    index: 2,
  },
  {
    name: '3. 인적 정보 작성',
    index: 3,
  },
  {
    name: '4. 서류 등록',
    index: 4,
  },
  {
    name: '5. 진행 완료',
    index: 5,
  },
];

interface StepProps {
    step: number;
}

const StepHeader: React.VFC<StepProps> = ({ step = 1 }) => {
  return (
      <SolutionHeader>
        <StepContainer>
            <NavigationContainer>
            <Navigation>
                {steps.map(({ name, index }) => (
                    <NavItem key={index} isStep={step === index}>
                        {name}
                    </NavItem>
                ))}
            </Navigation>
            </NavigationContainer>
        </StepContainer>
        <UnivContainer>
            <EmptyText>
                우측의  버튼을 클릭하여 입학을 준비할 대학교를 선택하세요.
            </EmptyText>
            <UnivSelectButton>
                <ClickIcon/>
                대학교<br/>선택하기
            </UnivSelectButton>

        </UnivContainer>
      </SolutionHeader>
  );
};

export default StepHeader;
