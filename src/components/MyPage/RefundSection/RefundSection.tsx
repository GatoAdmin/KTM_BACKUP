import React from 'react';
import { } from './RefundSection.style';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';

interface RefundSectionProps {
  t: (s:string) => string;
  payId: number;
}

const RefundSection: React.FC<RefundSectionProps> = ({ payId }) => {
  const getMyRefundInfo = async () => {
    const refund = await API.getMyRefundInfo(payId);
    return refund;
  };

  const [loading, resolved, error] = usePromise(getMyRefundInfo, []);

  console.log(resolved);

  return (
    <>

    </>
  );
};

export default RefundSection;
