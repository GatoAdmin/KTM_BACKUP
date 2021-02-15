import React from 'react';
import {
  DocumentItem,
  DocumentIconContainer,
  DocumentTypeIconContainer
} from './DocumentShortItem.style';

import WritePictogram from '@assets/svg/write_pictogram.svg';
import SearchPictogram from '@assets/svg/search_pictogram.svg';
import StudyPictogram from '@assets/svg/study_pictogram.svg';
import FamilyPictogram from '@assets/svg/family_pictogram.svg';
import BalancePictogram from '@assets/svg/balance_pictogram.svg';

const documentPictogram = {
  write: WritePictogram,
  check: SearchPictogram,
  study: StudyPictogram,
  family: FamilyPictogram,
  balance: BalancePictogram,
} as const;

type Pictogram = keyof typeof documentPictogram;

interface DocumentShortItemProps {
  id?: string | number;
  pictogram?: Pictogram;
}
const DocumentShortItem: React.FC<DocumentShortItemProps> = ({
  id,
  pictogram,
  children,
}) => {
  const Pictogram = documentPictogram[pictogram];
  return(
    <DocumentItem>
        <DocumentTypeIconContainer>
          <Pictogram />
        </DocumentTypeIconContainer>
      {children}
    </DocumentItem>
  );
}

export default DocumentShortItem;
