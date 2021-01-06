import * as React from 'react';
import {
  CategoryCheckbox,
  CategoryCheckboxContainer,
  CategoryFilterContainer, CategoryFilterTitle, CategoryIcon,
} from '@components/RecommendPage/CategoryFilter/Category.style';
import BadgeCheckbox from '@components/RecommendPage/BadgeCheckbox/BadgeCheckbox';
import { UpdateUrlQueryFunction } from '@views/RecommendPage/RecommendListPage/RecommendListPage';

export const univCategoryInfo = [
  { name: '대학교', value: 'UN' },
  { name: '전문대학교', value: 'CG' },
  { name: '어학원', value: 'IT' },
] as const;

export type UnivCategory = typeof univCategoryInfo[number]['value']

export interface CategoryFilterRef {
  value: Array<UnivCategory>;
}

interface CategoryFilterProps {
  initialCategoryValue: Array<UnivCategory>;
  updateUrlQuery: UpdateUrlQueryFunction;
}

const useCategoryFilter = (initialCategoryValue: Array<UnivCategory>, updateUrlQuery: UpdateUrlQueryFunction)
  : [Array<UnivCategory>, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [
    categoryValue,
    setCategoryValue,
  ] = React.useState<Array<UnivCategory>>(initialCategoryValue);
  const handleCategoryCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newCategoryValue: Array<UnivCategory>;
    const { target: { value } } = event;
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

const CategoryFilter: React.ForwardRefRenderFunction<CategoryFilterRef, CategoryFilterProps> = ({
  initialCategoryValue,
  updateUrlQuery,
}, ref) => {
  const [categoryValue, handleCategoryCheckbox] = useCategoryFilter(initialCategoryValue, updateUrlQuery);

  React.useImperativeHandle<CategoryFilterRef, CategoryFilterRef>(ref, () => ({
    value: categoryValue,
  }), [categoryValue]);

  return (
    <CategoryFilterContainer>
      <CategoryIcon />
      <CategoryFilterTitle>
        대학 종류
      </CategoryFilterTitle>
      <CategoryCheckboxContainer>
        {univCategoryInfo.map((categoryInfo) => (
          <CategoryCheckbox key={categoryInfo.value}>
            <BadgeCheckbox
              id={`category-${categoryInfo.value}`}
              value={categoryInfo.value}
              checked={categoryValue.includes(categoryInfo.value)}
              onChange={handleCategoryCheckbox}
            >
              {categoryInfo.name}
            </BadgeCheckbox>
          </CategoryCheckbox>
        ))}
      </CategoryCheckboxContainer>
    </CategoryFilterContainer>
  );
};

export default React.forwardRef(CategoryFilter);
