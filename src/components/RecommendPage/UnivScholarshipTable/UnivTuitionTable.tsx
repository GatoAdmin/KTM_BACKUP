,import React from 'react';
import styled from 'styled-components';
import {
  Table,
  TableCol,
  TableHeadCol,
  TableRow,
  TableTitle,
} from '@components/Shared/Style/Table.style';
import TypeSelect from '@components/RecommendPage/TypeSelect/TypeSelect';

const UnivScholarshipSection = styled.section`
  margin: 0 0 80px;
`;

const scholarshipType = ['입학', '재학'] as const;
export type ScholarshipType = typeof scholarshipType[number];

interface IProps {
  tableData: Array<{
    scholarshiptype: ScholarshipType;
    target: string;
    statement: string;
  }>;
  additionalInfo: string;
}

const UnivScholarshipTable: React.FC<IProps> = ({
  tableData,
}) => {
  const [type, setType] = React.useState<ScholarshipType>(scholarshipType[0]);
  const handleChangeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setType(target.value as ScholarshipType);
  };
  console.log(type);
  const renderedData = tableData.filter((data) => data.scholarshiptype === type);
  return (
    <UnivScholarshipSection>
      <TableTitle>외국인 장학금</TableTitle>
      <TypeSelect
        name="scholarship"
        types={scholarshipType}
        typeFooter="장학금"
        value={type}
        onChange={handleChangeSelect}
      />
      <Table>
        <thead>
          <TableRow>
            <TableHeadCol width="346px">장학 대상</TableHeadCol>
            <TableHeadCol width="353px">장학 내역</TableHeadCol>
          </TableRow>
        </thead>
        <tbody>
          {renderedData.map((value) => (
            <TableRow key={value.target}>
              <TableCol>{value.target}</TableCol>
              <TableCol>{value.statement}</TableCol>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </UnivScholarshipSection>
  );
};

export default UnivScholarshipTable;
