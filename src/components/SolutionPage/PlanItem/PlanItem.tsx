import React from 'react';
import {UnivSelectPlan} from './PlanItem.style';

interface PlanItemProps {
  type: string;
}

interface colorCode {
  name: string;
  type: string;
  color : string;
  rank: string;
}

const serviceColorCodes: Array<colorCode> = [
  {
    name: '번역 공증 서비스',
    type: "trans",
    color : "#FF988C",
    rank: "1",
  },
  {
    name: '입학지원 서비스',
    type: "support",
    color : "#2FC5CE",
    rank: "2",
  },
  {
    name: '입학지원 PRO',
    type: "pro",
    color : "#8C30F5",
    rank: "3",
  }
];


const PlanItem: React.FC<PlanItemProps> = ({
  type,
  children
}) =>{
  let plan = null;
  if(!isNaN(type)){
    plan = serviceColorCodes.find(service=>service.rank===type);
  }else{
    plan = serviceColorCodes.find(service=>service.type===type);
  }

  return (<UnivSelectPlan backgroundColor={plan?.color}>
    {plan?.name}
  </UnivSelectPlan>);
};

export default PlanItem;
