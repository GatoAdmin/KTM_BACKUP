import React from 'react';
import {UnivSelectPlan} from './PlanItem.style';

interface PlanItemProps {
  type: string;
}

interface colorCode {
  name: string;
  type: string;
  color : string;
}

const serviceColorCodes: Array<colorCode> = [
  {
    name: '번역 공증 서비스',
    type: "trans",
    color : "#FF988C",
  },
  {
    name: '입학지원 서비스',
    type: "support",
    color : "#2FC5CE",
  },
  {
    name: '입학지원 PRO',
    type: "pro",
    color : "#8C30F5",
  }
];


const PlanItem: React.FC<PlanItemProps> = ({
  type,
  children
}) =>{
  const plan = serviceColorCodes.find(service=>service.type===type);
  return (<UnivSelectPlan backgroundColor={plan?.color}>
    {plan?.name}
  </UnivSelectPlan>);
};

export default PlanItem;
