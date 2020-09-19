import * as React from 'react';
import {
  BackgroundNumber,
  Description,
  NumberSectionContainer,
  NumberSectionContent,
  ImageContainer,
  TextContainer,
  Title,
  RouteButton
} from "./NumberSection.style";
import Link from "next/link";

interface NumberSectionProps {
  buttonName: string;
  buttonHref: string;
  number: number;
  titleFirst: string;
  titleSecond: string;
  image: React.ReactNode;
}

const NumberSection: React.FC<NumberSectionProps> = ({
  buttonHref,
  buttonName,
  children,
  number,
  image,
  titleFirst,
  titleSecond
}) => {
  const isNumberEven = !(number & 1);
  return (
    <NumberSectionContainer isNumberEven={isNumberEven}>
      <NumberSectionContent>
        <TextContainer>
          <Title>
            { titleFirst }
            <br/>
            { titleSecond }
          </Title>
          <Description>
            {children}
          </Description>
          <Link
            href={buttonHref}
            passHref>
            <RouteButton>
              { buttonName }
            </RouteButton>
          </Link>
        </TextContainer>
        <ImageContainer>
          <BackgroundNumber isNumberEven={isNumberEven}>
            0{ number }
          </BackgroundNumber>
          { image }
        </ImageContainer>
      </NumberSectionContent>
    </NumberSectionContainer>
  );
}

export default NumberSection;
