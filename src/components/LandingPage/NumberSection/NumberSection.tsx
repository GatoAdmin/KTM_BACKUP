import React from 'react';
import Link from 'next/link';
import { StyledComponentBase } from 'styled-components';
import useIntersection from '@util/hooks/useInteraction';
import {
  BackgroundNumber,
  Description,
  NumberSectionContainer,
  NumberSectionContent,
  ImageContainer,
  TextContainer,
  Title,
  RouteButton,
} from './NumberSection.style';

interface NumberSectionProps {
  buttonName: string;
  buttonHref: string;
  number: number;
  titleFirst: string;
  titleSecond: string;
  Image: StyledComponentBase<'img', Record<string, unknown>>;
}

const NumberSection: React.FC<NumberSectionProps> = ({
  buttonHref,
  buttonName,
  children,
  number,
  Image,
  titleFirst,
  titleSecond,
}) => {
  const content = React.useRef<HTMLDivElement>(null);
  const contentVisible = useIntersection(content, { threshold: 0.7 });
  const isNumberEven = !(number % 2);
  return (
    <NumberSectionContainer isNumberEven={isNumberEven}>
      <NumberSectionContent ref={content} show={contentVisible}>
        <TextContainer>
          <Title>
            {titleFirst}
            <br />
            {titleSecond}
          </Title>
          <Description>{children}</Description>
          <Link href={buttonHref} passHref>
            <RouteButton>{buttonName}</RouteButton>
          </Link>
        </TextContainer>
        <ImageContainer>
          <BackgroundNumber isNumberEven={isNumberEven}>
            0
            {number}
          </BackgroundNumber>
          <Image />
        </ImageContainer>
      </NumberSectionContent>
    </NumberSectionContainer>
  );
};

export default NumberSection;
