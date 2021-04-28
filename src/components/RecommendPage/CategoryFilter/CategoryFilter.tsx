import React from 'react';
import {
  CategoryCheckbox,
  CategoryCheckboxContainer,
  CategoryFilterContainer,
  CategoryFilterTitle,
  CategoryIcon,
} from '@components/RecommendPage/CategoryFilter/Category.style';
import BadgeCheckbox from '@components/RecommendPage/BadgeCheckbox/BadgeCheckbox';
import { UpdateUrlQueryFunction } from '@views/RecommendPage/RecommendListPage/RecommendListPage';

export const univCategoryInfo = [
  { name: '대학교', vnName: 'Đại học', value: '4년제' },
  { name: '전문대학교', vnName: 'Trường nghề', value: '전문대' },
  { name: '어학원', vnName: 'Trường tiếng', value: '어학원' },
] as const;

export type UnivCategory = typeof univCategoryInfo[number]['value'];

export interface CategoryFilterRef {
  value: Array<UnivCategory>;
}

interface CategoryFilterProps {
  initialCategoryValue: Array<UnivCategory>;
  updateUrlQuery: UpdateUrlQueryFunction;
}

const useCategoryFilter = (
  initialCategoryValue: Array<UnivCategory>,
  updateUrlQuery: UpdateUrlQueryFunction,
): [Array<UnivCategory>, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [categoryValue, setCategoryValue] = React.useState<Array<UnivCategory>>(initialCategoryValue);
  const handleCategoryCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newCategoryValue: Array<UnivCategory>;
    const {
      target: { value },
    } = event;
    const currentCategoryValue = value as UnivCategory;
    if (categoryValue.includes(currentCategoryValue)) {
      newCategoryValue = Array.from(categoryValue);
      const targetIndex = newCategoryValue.indexOf(currentCategoryValue);
      newCategoryValue.splice(targetIndex, 1);
    } else {
      newCategoryValue = categoryValue.concat(currentCategoryValue);
    }
    setCategoryValue(newCategoryValue);
    updateUrlQuery('category', newCategoryValue);
  };

  return [categoryValue, handleCategoryCheckbox];
};

const CategoryFilter: React.ForwardRefRenderFunction<CategoryFilterRef, CategoryFilterProps> = (
  { lang, initialCategoryValue, updateUrlQuery },
  ref,
) => {
  const [categoryValue, handleCategoryCheckbox] = useCategoryFilter(initialCategoryValue, updateUrlQuery);

  React.useImperativeHandle<CategoryFilterRef, CategoryFilterRef>(
    ref,
    () => ({
      value: categoryValue,
    }),
    [categoryValue],
  );

  return (
    <CategoryFilterContainer>
      <CategoryIcon />
      <CategoryFilterTitle>{lang === 'ko' ? '대학 종류' : 'Thể loại trường'}</CategoryFilterTitle>
      <CategoryCheckboxContainer>
        {univCategoryInfo.map((categoryInfo) => (
          <CategoryCheckbox key={categoryInfo.value}>
            <BadgeCheckbox
              id={`category-${categoryInfo.value}`}
              value={categoryInfo.value}
              checked={categoryValue.includes(categoryInfo.value)}
              onChange={handleCategoryCheckbox}
            >
              {lang === 'ko' ? categoryInfo.name : categoryInfo.vnName}
            </BadgeCheckbox>
          </CategoryCheckbox>
        ))}
      </CategoryCheckboxContainer>
    </CategoryFilterContainer>
  );
};

export default React.forwardRef(CategoryFilter);
