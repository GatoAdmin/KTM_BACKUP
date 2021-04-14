import React from 'react';
import {
    Union,
    Rectangle,
    Polygon,
    RectangleText
} from './PriceInfoHeader.style';

interface PriceInfoHeaderProps {
  backgroundColor?: string;
  gradient?:string;
}

const PriceInfoHeader: React.FC<PriceInfoHeaderProps> = ({
  backgroundColor,
  gradient,
  children,
}) => (
  <Union gradient={gradient}>
    <Rectangle backgroundColor={backgroundColor}>
      <RectangleText>
        {children}
      </RectangleText> 
    </Rectangle>
    <Polygon backgroundColor={backgroundColor}/>
  </Union>
);

export default PriceInfoHeader;
