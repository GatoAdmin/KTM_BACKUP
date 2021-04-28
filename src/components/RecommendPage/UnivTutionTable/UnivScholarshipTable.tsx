import React from 'react';
import styled from 'styled-components';
import { Table, TableCol, TableHeadCol, TableRow, TableTitle } from '@components/Shared/Style/Table.style';
import TypeSelect from '@components/RecommendPage/TypeSelect/TypeSelect';

const UnivTuitionSection = styled.section`
  margin: 0 0 80px;
`;

const subjectType = ['인문', '자연', '예체능'] as const;
export type SubjectType = typeof subjectType[number];

interface IProps {
  t: (s: string) => string;
  tableData: Array<{
    type: SubjectType;
    name: string;
    vnName: string;
    tuition: string;
  }>;
}

const UnivTuitionTable: React.FC<IProps> = ({ t, tableData }) => {
  const [type, setType] = React.useState<SubjectType>(subjectType[0]);
  const handleChangeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setType(target.value as SubjectType);
  };

  const renderedData = tableData.filter((data) => data.type === type);
  return (
    <UnivTuitionSection>
      <TableTitle>{t('tuition-label')}</TableTitle>
      <TypeSelect t={t} name="subject" types={subjectType} value={type} onChange={handleChangeSelect} />
      <Table>
        <thead>
          <TableRow>
            <TableHeadCol width="346px">{t('head1')}</TableHeadCol>
            <TableHeadCol width="353px">{t('head2')}</TableHeadCol>
            <TableHeadCol width="223px">{t('head3')}</TableHeadCol>
          </TableRow>
        </thead>
        <tbody>
          {renderedData.map((value) => (
            <TableRow key={value.name}>
              <TableCol>{value.name}</TableCol>
              <TableCol>{value.vnName}</TableCol>
              <TableCol>{value.tuition}</TableCol>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </UnivTuitionSection>
  );
};

export default UnivTuitionTable;
