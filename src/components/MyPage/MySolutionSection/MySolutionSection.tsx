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
          <Td>{val.stage}</Td>
          <Td>{t(`service-${val.rate}`)}</Td>
          <Td>
            <ButtonTd>
              { val.alarm ? <AlertIcon /> : null }
              <Button onClick={() => router.replace('/solution')}> MORE </Button>
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
          <Td>{t(pay.rate)}</Td>
          <Td>{`${pay.cost.toLocaleString()} KRW`}</Td>
          <Td>
            <ButtonTd>
              <Button onClick={() => onRefundClick(pay.id)}> 환불 신청 </Button>
            </ButtonTd>
          </Td>
        </Tr>
      );
    });
  };

  const createEmptyMessage = (obj: ValueProps | PaymentProps, s:string, b: boolean) => {
    if (obj === undefined) {
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
      <Title> MY 입학솔루션 </Title>

      <Table>
        <Tr>
          <TableHeader> 최근 진행일 </TableHeader>
          <TableHeader> 대학 이름 </TableHeader>
          <TableHeader> 진행 단계 </TableHeader>
          <TableHeader> 결제 등급 </TableHeader>
          <TableHeader> &nbsp; </TableHeader>
        </Tr>
        {createValue()}
      </Table>
      {createEmptyMessage(value, '진행 중인 입학솔루션이 없습니다', true)}

      <EmptyArea />
      <Title> 결제 내역 </Title>

      <Table>
        <Tr>
          <TableHeader> 결제번호 </TableHeader>
          <TableHeader> 결제일 </TableHeader>
          <TableHeader> 대학 이름 </TableHeader>
          <TableHeader> 결제 등급 </TableHeader>
          <TableHeader> 결제 금액 </TableHeader>
          <TableHeader> &nbsp; </TableHeader>
        </Tr>
        {createPayment()}
      </Table>
      {createEmptyMessage(payment, '결제 내역이 없습니다', false)}
    </MySolutionSectionContainer>
  );
};

export default MySolutionSection;
