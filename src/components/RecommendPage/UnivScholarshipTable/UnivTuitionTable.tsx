import React from 'react';
import styled from 'styled-components';
import { Table, TableCol, TableHeadCol, TableRow, TableTitle } from '@components/Shared/Style/Table.style';
import TypeSelect from '@components/RecommendPage/TypeSelect/TypeSelect';

const UnivScholarshipSection = styled.section`
  margin: 0 0 80px;
`;

const scholarshipType = ['입학', '재학'] as const;
export type ScholarshipType = typeof scholarshipType[number];

interface IProps {
  t: (s: string) => string;
  lang: string;
  tableData: Array<{
    ScholarshipType: ScholarshipType;
    Target: string;
    Statement: string;
    VnTarget: string;
    VnStatement: string;
  }>;
}

const UnivScholarshipTable: React.FC<IProps> = ({ t, lang, tableData }) => {
  const [type, setType] = React.useState<ScholarshipType>(scholarshipType[0]);
  const handleChangeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setType(target.value as ScholarshipType);
  };
  const renderedData = tableData.filter((data) => data.ScholarshipType === type);
  return (
    <UnivScholarshipSection>
      <TableTitle>{t('scholarship-label')}</TableTitle>
      <TypeSelect t={t} name="scholarship" types={scholarshipType} value={type} onChange={handleChangeSelect} />
      <Table>
        <thead>
          <TableRow>
            <TableHeadCol width="346px">{t('scholarship-head1')}</TableHeadCol>
            <TableHeadCol width="353px">{t('scholarship-head2')}</TableHeadCol>
          </TableRow>
        </thead>
        <tbody>
          {renderedData.map((value) => (
            <TableRow key={value.Target}>
              <TableCol>{lang === 'ko' ? value.Target : value.VnTarget}</TableCol>
              <TableCol>{lang === 'ko' ? value.Statement : value.VnStatement}</TableCol>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </UnivScholarshipSection>
  );
};

export default UnivScholarshipTable;
