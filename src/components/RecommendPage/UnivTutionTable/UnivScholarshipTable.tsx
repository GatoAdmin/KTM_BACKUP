import React from 'react';
import styled from 'styled-components';
import {
  Table,
  TableCol,
  TableHeadCol,
  TableRow,
  TableTitle,
} from '@components/Shared/Style/Table.style';
import TypeSelect from '@components/RecommendPage/TypeSelect/TypeSelect';

const UnivTuitionSection = styled.section`
  margin: 0 0 80px;
`;

const subjectType = ['인문', '자연', '예체능'] as const;
export type SubjectType = typeof subjectType[number];

interface IProps {
  tableData: Array<{
    type: SubjectType;
    name: string;
    tuition: string;
  }>;
  additionalInfo: string;
}

const UnivTuitionTable: React.FC<IProps> = ({
  tableData,
}) => {
  const [type, setType] = React.useState<SubjectType>(subjectType[0]);
  const handleChangeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setType(target.value as SubjectType);
  };

  const renderedData = tableData.filter((data) => data.type === type);
  return (
    <UnivTuitionSection>
      <TableTitle>모집학과</TableTitle>
      <TypeSelect
        name="subject"
        types={subjectType}
        typeFooter="계열"
        value={type}
        onChange={handleChangeSelect}
      />
      <Table>
        <thead>
          <TableRow>
            <TableHeadCol width="346px">학과명</TableHeadCol>
            <TableHeadCol width="353px">학과명(외국어)</TableHeadCol>
            <TableHeadCol width="223px">등록금</TableHeadCol>
          </TableRow>
        </thead>
        <tbody>
          {renderedData.map((value) => (
            <TableRow key={value.name}>
              <TableCol>{value.name}</TableCol>
              <TableCol> </TableCol>
              <TableCol>{value.tuition}</TableCol>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </UnivTuitionSection>
  );
};

export default UnivTuitionTable;
