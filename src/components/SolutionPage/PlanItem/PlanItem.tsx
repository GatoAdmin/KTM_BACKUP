import React from 'react';
import {UnivSelectPlan} from './PlanItem.style';

interface PlanItemProps {
  type: string;
  t,
  lang,
  changeLang
}

interface colorCode {
  name: string;
  type: string;
  color : string;
  rank: string;
}



const PlanItem: React.FC<PlanItemProps> = ({
  type,
  t,
  lang,
  changeLang,
  children
}) =>{
  const serviceColorCodes: Array<colorCode> = [
    {
      name: t('translation-notarization-service'),
      type: "trans",
      color : "#FF988C",
      rank: "1",
    },
    {
      name: t('enter-support-service'),
      type: "support",
      color : "#2FC5CE",
      rank: "2",
    },
    {
      name: t('enter-support-pro'),
      type: "pro",
      color : "#8C30F5",
      rank: "3",
    }
  ];
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
