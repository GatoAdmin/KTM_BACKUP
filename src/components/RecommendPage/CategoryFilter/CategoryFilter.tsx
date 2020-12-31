import * as React from 'react';
import {
  CategoryCheckbox,
  CategoryCheckboxContainer,
  CategoryFilterContainer, CategoryFilterTitle, CategoryIcon,
} from '@components/RecommendPage/CategoryFilter/Category.style';
import BadgeCheckbox from '@components/RecommendPage/BadgeCheckbox/BadgeCheckbox';

const univCategoryInfo = [
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
}

const useCategoryFilter = (initialCategoryValue: Array<UnivCategory>)
  : [Array<UnivCategory>, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [
    categoryValue,
    setCategoryValue
  ] = React.useState<Array<UnivCategory>>(initialCategoryValue);
  const handleCategoryCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    const currentCategoryValue = value as UnivCategory;
    if (categoryValue.includes(currentCategoryValue)) {
      const newTopikValue = Array.from(categoryValue);
      const targetIndex = newTopikValue.indexOf(currentCategoryValue);
      newTopikValue.splice(targetIndex, 1);
      setCategoryValue(newTopikValue);
    } else {
      setCategoryValue((state) => state.concat(currentCategoryValue));
    }
  };

  return [categoryValue, handleCategoryCheckbox];
};

const CategoryFilter: React.ForwardRefRenderFunction<CategoryFilterRef, CategoryFilterProps> = ({
  initialCategoryValue,
}, ref) => {
  const [categoryValue, handleCategoryCheckbox] = useCategoryFilter(initialCategoryValue);

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
