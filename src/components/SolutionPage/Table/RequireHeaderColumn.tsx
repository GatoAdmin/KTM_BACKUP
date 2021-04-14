import React from 'react';
import {
    HeaderFlexColumn,
    RequireIcon
} from './Table.style';

interface RadioButtonProps {
  id?: string;
}

const RequireHeaderColumn: React.FC<RadioButtonProps> = ({
  id,
  children,
}) => (
    <HeaderFlexColumn id={String(id)}>
      {children}<RequireIcon>*</RequireIcon>
    </HeaderFlexColumn>
);

export default RequireHeaderColumn;
