import React from 'react';
import { UpdateUrlQueryFunction } from '@views/RecommendPage/RecommendListPage/RecommendListPage';
import {
  LocationFilterContainer,
  LocationFilterTitle,
  LocationIcon,
  LocationLabel,
  LocationMap,
  LocationShape,
} from './LocationFilter.style';

const locationArray = [
  { name: '인천', value: 'IC', top: '70px', left: '10px' },
  { name: '경기', value: 'KK', top: '80px', left: '60px' },
  { name: '서울', value: 'SO', top: '75px', left: '50px' },
  { name: '강원', value: 'GW', top: '80px', left: '120px' },
  { name: '대전', value: 'DJ', top: '132px', left: '16px' },
  { name: '충남', value: 'CN', top: '125px', left: '10px' },
  { name: '충북', value: 'CB', top: '110px', left: '85px' },
  { name: '부산', value: 'BS', top: '170px', left: '130px' },
  { name: '울산', value: 'US', top: '165px', left: '136px' },
  { name: '경남', value: 'KN', top: '232px', left: '96px' },
  { name: '경북', value: 'KB', top: '122px', left: '143px' },
  { name: '전남', value: 'JN', top: '240px', left: '73px' },
  { name: '전북', value: 'JB', top: '162px', left: '20px' },
  { name: '대구', value: 'DG', top: '151px', left: '106px' },
  { name: '광주', value: 'GJ', top: '178px', left: '20px' },
  { name: '제주', value: 'JJ', top: '252px', left: '66px' },
  // { name: '세종', value: 'SJ', top: '52px', left: '26px' },
] as const;
export type KoreaLocation = typeof locationArray[number]['value'];

export interface LocationFilterRef {
  value: Array<KoreaLocation>;
}

interface LocationFilterProps {
  initialLocationValue: Array<KoreaLocation>;
  updateUrlQuery: UpdateUrlQueryFunction;
}

const useLocation = (
  initialLocationValue: Array<KoreaLocation>,
  update: UpdateUrlQueryFunction,
): [Array<KoreaLocation>, (location: KoreaLocation) => () => void] => {
  const [filterValue, setFilterValue] = React.useState<Array<KoreaLocation>>(() => initialLocationValue);

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

const LocationFilter: React.ForwardRefRenderFunction<LocationFilterRef, LocationFilterProps> = (
  { initialLocationValue, updateUrlQuery },
  ref,
) => {
  const [filterValue, handleClickLocationShape] = useLocation(initialLocationValue, updateUrlQuery);
  const labelRef = React.useRef();

  React.useImperativeHandle<LocationFilterRef, LocationFilterRef>(
    ref,
    () => ({
      value: filterValue,
    }),
    [filterValue],
  );

  const labelValueChanger = (value) => {
    if (labelRef.current) {
      let current = locationArray.find((elem) => elem.value === value);
      labelRef.current.style.visibility = 'visible';
      labelRef.current.style.top = current.top;
      labelRef.current.style.left = current.left;
      labelRef.current.innerText = current.name;
    }
  };

  const onLocationLeave = () => {
    if (labelRef.current) labelRef.current.style.visibility = 'hidden';
  };

  // TODO: This doesn't meet the web accessibility. Add checkBox with label
  return (
    <LocationFilterContainer>
      <LocationIcon />
      <LocationFilterTitle>위치</LocationFilterTitle>

      <div>
        <LocationLabel ref={labelRef} />
        <LocationMap>
          {locationArray.map((locationValue) => (
            <>
              <LocationShape
                key={locationValue.value}
                location={locationValue.value}
                active={filterValue.includes(locationValue.value)}
                onClick={handleClickLocationShape(locationValue.value)}
                onMouseOver={() => labelValueChanger(locationValue.value)}
                onMouseLeave={() => onLocationLeave()}
              />
            </>
          ))}
        </LocationMap>
      </div>
    </LocationFilterContainer>
  );
};

export default React.forwardRef(LocationFilter);
