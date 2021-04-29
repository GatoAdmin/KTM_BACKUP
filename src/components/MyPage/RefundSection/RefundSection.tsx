/* eslint-disable camelcase */
import React, { useState } from 'react';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import {
  Title,
  EmptyFlame,
} from '@components/MyPage';
import Button from '@components/Shared/Button/Button';

import {
  RefundSectionContainer,
  Table,
  Tr,
  Column,
  ColumnInfo,
  ColumnInput,
  ButtonArea,
  RefundPolicyText,
  ButtonWrap,
} from './RefundSection.style';

interface RefundSectionProps {
  t: (s:string) => string;
  lang: string;
  payId: number;
}

const RefundSection: React.FC<RefundSectionProps> = ({ payId, t, lang }) => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [refundReason, setRefundReason] = useState('');

  const getMyRefundInfo = async () => {
    const refund = await API.getMyRefundInfo(payId);
    return refund;
  };

  const [loading, resolved, error] = usePromise(getMyRefundInfo, []);

  if (loading) return <EmptyFlame />; // 나중에 스피너나 빈프레임 넣으면 좋을 것 같습니다 ㅎㅎ
  if (error) window.location.href = '/';
  if (!resolved) return null;

  const {
    id,
    rate,
    refund_account,
    refund_bank,
    refund_enable_cost,
    refund_reason,
    refund_status,
    stage,
    total_cost,
    univ_name,
  } = resolved;

  const handlingRefundButtonClick = async () => {
    await API.postRefund(id, accountNumber, refundReason, bankName);
    window.location.reload();
  };

  return (
    <RefundSectionContainer>
      <Title>{t('refund_application')}</Title>
      <Table>
        <Tr>
          <Column isKorean={lang === 'ko'}>{t('univercity_name')}</Column>
          <ColumnInfo>{univ_name}</ColumnInfo>
        </Tr>
        <Tr>
          <Column isKorean={lang === 'ko'}>{t('payment_class')}</Column>
          <ColumnInfo>{t(`service-${rate}`)}</ColumnInfo>
        </Tr>
        <Tr>
          <Column isKorean={lang === 'ko'}>{t('payment_price2')}</Column>
          <ColumnInfo>{`${total_cost.toLocaleString()} KRW`}</ColumnInfo>
        </Tr>
        <Tr>
          <Column isKorean={lang === 'ko'}>{t('steps_in_progress')}</Column>
          <ColumnInfo>{t(stage)}</ColumnInfo>
        </Tr>
        <Tr>
          <Column isKorean={lang === 'ko'}>{t('refundable_amount')}</Column>
          <ColumnInfo>{`${refund_enable_cost.toLocaleString()} KRW`}</ColumnInfo>
        </Tr>

        <Tr>
          <Column isKorean={lang === 'ko'}>{t('bank_name(common)')}</Column>
          {refund_status === null
            ? (
              <ColumnInput
                value={bankName}
                onChange={(e:any) => setBankName(e.target.value)}
                placeholder={t('bank_name_placeholder')}
              />
            )
            : <ColumnInfo>{refund_bank}</ColumnInfo>}
        </Tr>
        <Tr>
          <Column isKorean={lang === 'ko'}>{t('refund_account_number')}</Column>
          {refund_status === null
            ? (
              <ColumnInput
                value={accountNumber}
                onChange={(e:any) => setAccountNumber(e.target.value)}
                placeholder={t('refund_accound_number_placeholder')}
              />
            ) : <ColumnInfo>{refund_account}</ColumnInfo>}
        </Tr>
        <Tr>
          <Column isKorean={lang === 'ko'}>{t('reason_for_refund')}</Column>
          {refund_status === null
            ? (
              <ColumnInput
                value={refundReason}
                onChange={(e:any) => setRefundReason(e.target.value)}
                placeholder={t('reason_for_refund_placeholder')}
              />
            ) : <ColumnInfo>{refund_reason}</ColumnInfo>}
        </Tr>
        {refund_status === null
          ? null : (
            <Tr>
              <Column isKorean={lang === 'ko'}>{t('refund_details')}</Column>
              <ColumnInfo>{t(`refund-${refund_status}`)}</ColumnInfo>
            </Tr>
          ) }
      </Table>
      <ButtonArea>
        <RefundPolicyText>{t('view_refund_policy')}</RefundPolicyText>
        {refund_status === null
          ? (
            <ButtonWrap>
              <Button onClick={handlingRefundButtonClick}>{t('refund_application')}</Button>
            </ButtonWrap>
          ) : null }
      </ButtonArea>
    </RefundSectionContainer>
  );
};

export default RefundSection;
