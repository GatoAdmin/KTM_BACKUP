import * as React from 'react';
import { UpdateUrlQueryFunction } from '@views/RecommendPage/RecommendListPage/RecommendListPage';
import {
  LocationFilterContainer,
  LocationFilterTitle,
  LocationIcon,
  LocationMap,
  LocationShape,
} from './LocationFilter.style';

const locationArray = [
  { name: '인천', value: 'IC' },
  { name: '경기', value: 'KK' },
  { name: '서울', value: 'SO' },
  { name: '강원', value: 'GW' },
  { name: '대전', value: 'DJ' },
  { name: '세종', value: 'SJ' },
  { name: '충남', value: 'CN' },
  { name: '충북', value: 'CB' },
  { name: '부산', value: 'BS' },
  { name: '울산', value: 'US' },
  { name: '경남', value: 'KN' },
  { name: '경북', value: 'KB' },
  { name: '전남', value: 'JN' },
  { name: '전북', value: 'JB' },
  { name: '대구', value: 'DG' },
  { name: '광주', value: 'GJ' },
  { name: '제주', value: 'JJ' },
] as const;
export type KoreaLocation = typeof locationArray[number]['value'];

export interface LocationFilterRef {
  value: Array<KoreaLocation>;
}

interface LocationFilterProps {
  initialLocationValue: Array<KoreaLocation>;
  updateUrlQuery: UpdateUrlQueryFunction;
}

const useLocation = (initialLocationValue: Array<KoreaLocation>, update: UpdateUrlQueryFunction)
  : [Array<KoreaLocation>, (location: KoreaLocation) => () => void] => {
  const [
    filterValue,
    setFilterValue,
  ] = React.useState<Array<KoreaLocation>>(() => initialLocationValue);

  const handleClickLocationShape = (location: KoreaLocation) => () => {
    let newFilterValue: Array<KoreaLocation>;
    if (filterValue.includes(location)) {
      newFilterValue = Array.from(filterValue);
      const targetIndex = newFilterValue.indexOf(location);
      newFilterValue.splice(targetIndex, 1);
    } else {
      newFilterValue = filterValue.concat(location);
    }
    setFilterValue(newFilterValue);
    update('location', newFilterValue);
  };

  return [filterValue, handleClickLocationShape];
};

const LocationFilter: React.ForwardRefRenderFunction<LocationFilterRef, LocationFilterProps> = ({
  initialLocationValue,
  updateUrlQuery,
}, ref) => {
  const [filterValue, handleClickLocationShape] = useLocation(initialLocationValue, updateUrlQuery);

  React.useImperativeHandle<LocationFilterRef, LocationFilterRef>(ref, () => ({
    value: filterValue,
  }), [filterValue]);

  // TODO: This doesn't meet the web accessibility. Add checkBox with label
  return (
    <LocationFilterContainer>
      <LocationIcon />
      <LocationFilterTitle>위치</LocationFilterTitle>
      <LocationMap>
        {locationArray.map((locationValue) => (
          <LocationShape
            key={locationValue.value}
            location={locationValue.value}
            active={filterValue.includes(locationValue.value)}
            onClick={handleClickLocationShape(locationValue.value)}
          />
        ))}
      </LocationMap>
    </LocationFilterContainer>
  );
};

export default React.forwardRef(LocationFilter);
