import styled  from 'styled-components';
import { fontColor, mainColor, whiteColor } from '@util/style/color';
import Location from '@assets/svg/location_icon.svg';
import { defaultFont } from '@util/style/font';
import { KoreaLocation } from '@components/RecommendPage/LocationFilter/LocationFilter';

export const LocationFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const LocationIcon = styled(Location)`
  margin: 13px auto 0;
`;

export const LocationFilterTitle = styled.h3`
  margin: 12px auto 0;
  font: normal bold 14px/19px ${defaultFont};
  color: ${fontColor};
`;

export const LocationMap = styled.svg.attrs({
  viewBox: '0 0 150 210',
  xmlns: 'http://www.w3.org/2000/svg',
})`
  width: 150px;
  height: 210px;
  margin: 5px auto 0;
`;

export const LocationContainer = styled.div`

`;

const locationShapeArray: Record<KoreaLocation, string> = {
  SO: 'm 40.8895,41.5162 2.5002,4.0074 3.0284,4.8159 7.2893,0.4921 4.4721,-3.4449 -0.0704,-6.0111 -4.2257,-5.2378 h -7.2541 z',
  IC: 'm 23.212,39.0204 7.7823,-7.2415 5.0709,2.531 7.6062,11.7762 -4.1553,9.3857 -9.5782,-5.062 z',
  KK: 'M 54.2003,17.68274 72.1242,29.0722 76.4555,60.7096 60.7149,71.9233 40.6077,67.5995 39.516,55.4718 43.6713,46.0861 36.0651,34.3099 43.8826,20.2137 Z',
  GW: 'm 94.767,9 30.601,46.1203 -3.099,6.5032 L 98.9222,63.803 76.4557,60.7095 72.1244,29.0722 54.2004,17.6827 59.0952,14.23774 75.7514,13.88622 86.0691,10.08973 Z',
  DJ: 'm 60.1161,82.2581 9.543,2.3903 1.0917,8.8937 -4.1553,5.2025 -4.2609,-0.1054 -4.5074,-3.1286 -0.5634,-10.8622 z',
  CN: 'M 70.2932,102.5763 66.9478,109.15 37.2624,105.4588 25.677,72.2045 l 7.7823,-7.2415 7.1484,2.6365 20.1072,4.3237 1.4438,10.7216 -2.0426,-0.3867 v 0 l -2.8523,2.3903 0.5634,10.8622 4.5074,3.1286 4.2609,0.1054 2e-4,10e-5 z',
  CB: 'M 76.4555,60.7096 60.7149,71.9233 76.4557,60.7095 98.9222,63.803 78.1811,79.8678 l -1.0916,25.4856 -6.7964,-2.7771 h 1e-4 l -3.6975,-3.8316 4.1552,-5.2026 -1.0916,-8.8936 -7.5006,-2.0037 -1.4438,-10.7216 z',
  BS: 'm 109.5919,143.599 9.0851,0.036 5.775,-5.168 0.176,-5.624 -3.521,-4.605 -20.4594,11.495 0.9155,3.866 z',
  US: 'm 130.086,118.395 -0.105,10.3 -5.353,4.148 -3.521,-4.605 -8.064,-9.14 6.972,-5.589 z',
  KN: 'm 69.131,133.651 8.3457,23.236 6.6907,2.355 10.4937,-6.608 6.5146,4.359 6.6203,-6.328 1.7959,-7.066 h -8.0288 l -0.9156,-3.866 20.4595,-11.495 -8.064,-9.14 -5.5287,4.711 -18.6283,-3.902 -1.7254,-5.871 -9.9656,-4.042 -6.5146,11.002 z',
  KB: 'm 98.9222,63.803 -20.7411,16.0648 -1.0916,25.4856 0.1056,4.6406 9.9656,4.042 1.7255,5.871 18.6282,3.902 12.5006,-10.3 10.072,4.886 3.415,-13.5689 -6.233,-41.7613 -5,-1.4413 z',
  JN: 'M 77.4769,156.887 52.1228,174.428 30.0084,169.366 22.9656,171.44 13,158.504 l 8.24008,-20.423 10.66982,-9.492 8.1697,3.269 2.8875,-5.167 7.9584,2.988 1.1973,3.34 17.0083,0.632 z',
  JB: 'm 70.2931,102.5763 6.7963,2.7771 0.1056,4.6396 -6.5146,11.003 -1.5494,12.655 -17.0084,-0.633 -1.1972,-3.339 -7.9584,-2.988 -2.8876,5.167 -8.1696,-3.269 2.0776,-18.701 3.2749,-4.4292 29.6854,3.6912 z',
  DG: 'm 92.2314,120.539 0.6339,-10.756 6.0568,-6.117 8.4161,2.074 1.4438,7.488 -8.7683,9.034 z',
  GJ: 'm 39.2344,135.55 -2.5354,5.237 5.3526,5.695 9.4373,-5.414 -1.3733,-6.046 z',
  JJ: 'm 23.0361,186.345 12.9588,-4.851 10.9516,3.34 1.3733,6.854 -11.6206,6.257 -11.1981,1.055 -6.26807,-7.136 z',
  SJ: '',
} as const;

interface LocationShapeProps {
  location: KoreaLocation;
  active: boolean;
}

export const LocationShape = styled.path.attrs<LocationShapeProps>(({ location }) => ({
  d: locationShapeArray[location],
}))<LocationShapeProps>`
  fill: ${whiteColor};
  stroke: ${fontColor};
  cursor: pointer;
  transform-origin: center;
  fill: ${(props) => (props.active ? mainColor : whiteColor)};
  
  :hover {
    transform: scale(1.05);
    fill: ${mainColor};
    z-index: 2;
  }
`;
