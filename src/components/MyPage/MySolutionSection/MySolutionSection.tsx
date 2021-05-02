/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import Button from '@components/Shared/Button/Button';
import { useRouter } from 'next/router';
import {
  Title,
  EmptyFlame,
} from '@components/MyPage';
import {
  MySolutionSectionContainer,
  Table,
  TableHeader,
  Tr,
  Td,
  ButtonTd,
  AlertIcon,
  EmptyMessageBox,
  EmptyMessageBoxButtonContainer,
  EmptyArea,
} from './MySolutionSection.style';

interface MySolutionSectionProps {
  t: (s:string) => string;
  onRefundClick: (payId: number) => void;
}

interface PaymentProps {
  id: number;
  cost: number;
  rate: string;
  time: string;
  univ: string;
}

interface ValueProps {
  id: number;
  alarm: boolean;
  rate: string;
  recent_time: string;
  stage: string;
  univ: string;
  univ_code: string;
}

const MySolutionSection: React.FC<MySolutionSectionProps> = ({ t, onRefundClick }) => {
  const router = useRouter();
  const getMyService = async () => {
    const service = await API.getMyService();
    return service;
  };

  const [loading, resolved, error] = usePromise(getMyService, []);

  if (loading) return <EmptyFlame />; // 나중에 스피너나 빈프레임 넣으면 좋을 것 같습니다 ㅎㅎ
  if (error) window.location.href = '/';
  if (!resolved) return null;

  const { payment, value } = resolved;

  const createValue = () => {
    if (value === undefined) return null;

    return value.map((val: ValueProps) => {
      const date = new Date(val.recent_time);
      return (
        <Tr key={val.id}>
          <Td>{`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`}</Td>
          <Td>{val.univ}</Td>
          <Td>{t(val.stage)}</Td>
          <Td>{t(`service-${val.rate}`)}</Td>
          <Td>
            <ButtonTd>
              { val.alarm ? <AlertIcon /> : null }
              <Button onClick={() => router.replace(`/solution?univ=${val.univ_code}`)}>{t('more_button_text')}</Button>
            </ButtonTd>
          </Td>
        </Tr>
      );
    });
  };

  const createPayment = () => {
    if (payment === undefined) return null;

    return payment.map((pay: PaymentProps) => {
      const date = new Date(pay.time);
      return (
        <Tr key={pay.id}>
          <Td>{String(pay.id).padStart(8, '0')}</Td>
          <Td>{`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`}</Td>
          <Td>{pay.univ}</Td>
          <Td>{t(`service-${pay.rate}`)}</Td>
          <Td>{`${pay.cost.toLocaleString()} KRW`}</Td>
          <Td>
            <ButtonTd>
              <Button onClick={() => onRefundClick(pay.id)}>{t('refund_button_text')}</Button>
            </ButtonTd>
          </Td>
        </Tr>
      );
    });
  };

  const createEmptyMessage = (
    obj: Array<PaymentProps | ValueProps>, s:string, b: boolean,
  ) => {
    if (obj.length === 0) {
      return (
        <EmptyMessageBox>
          {s}
          {b
            ? (
              <EmptyMessageBoxButtonContainer>
                <Button onClick={() => router.replace('/recommend')}>MORE</Button>
              </EmptyMessageBoxButtonContainer>
            )
            : null}
        </EmptyMessageBox>
      );
    }
    return null;
  };

  return (
    <MySolutionSectionContainer>
      <Title>{t('my_solution_title')}</Title>

      <Table>
        <Tr>
          <TableHeader>{t('recently_date')}</TableHeader>
          <TableHeader>{t('univercity_name')}</TableHeader>
          <TableHeader>{t('steps_in_progress')}</TableHeader>
          <TableHeader>{t('payment_class')}</TableHeader>
          <TableHeader> &nbsp; </TableHeader>
        </Tr>
        {createValue()}
      </Table>
      {createEmptyMessage(value, t('solution_error_message'), true)}

      <EmptyArea />
      <Title>{t('payment_details')}</Title>

      <Table>
        <Tr>
          <TableHeader>{t('payment_number')}</TableHeader>
          <TableHeader>{t('payment_date')}</TableHeader>
          <TableHeader>{t('univercity_name')}</TableHeader>
          <TableHeader>{t('payment_class')}</TableHeader>
          <TableHeader>{t('payment_price')}</TableHeader>
          <TableHeader> &nbsp; </TableHeader>
        </Tr>
        {createPayment()}
      </Table>
      {createEmptyMessage(payment, t('payment_error_message'), false)}
    </MySolutionSectionContainer>
  );
};

export default MySolutionSection;
