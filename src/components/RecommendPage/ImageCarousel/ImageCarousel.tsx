import React from 'react';
import {
  ImageCarouselContainer,
  CarouselImage,
  ImageCarouselButton,
  LeftArrow,
  RightArrow,
  ButtonWrapper,
} from '@components/RecommendPage/ImageCarousel/ImageCarousel.style';

interface ImageCarouselProps {
  image: Array<string>;
}

const useCarousel = <Data extends unknown>(sources: Array<Data>) => {
  const srcInfos = sources.map((value, index) => ({ src: value, id: index }));
  const extendedSrcInfo = [srcInfos[srcInfos.length - 1], ...srcInfos, srcInfos[0]];
  const [carouselIndex, setCarouselIndex] = React.useState<number>(1);
  const createCycleCarousel = (isPrevious = true) => () => {
    let newCarouselIndex: number;
    if (isPrevious) {
      newCarouselIndex = carouselIndex - 1 ? carouselIndex - 1 : sources.length;
    } else {
      newCarouselIndex = (carouselIndex % sources.length) + 1;
    }
    setCarouselIndex(newCarouselIndex);
  };
  return {
    srcInfo: extendedSrcInfo.slice(carouselIndex - 1, carouselIndex + 2),
    createCycleCarousel,
  };
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ image }) => {
  const { srcInfo: renderingImageInfo, createCycleCarousel } = useCarousel(image);

  return (
    <ImageCarouselContainer>
      {renderingImageInfo.map((renderingImage, index) => (
        <CarouselImage
          key={renderingImage.id}
          index={index}
          src={renderingImage.src}
          alt={`info-${renderingImage.id}`}
        />
      ))}
      <ButtonWrapper>
        <ImageCarouselButton onClick={createCycleCarousel(true)}>
          <LeftArrow />
        </ImageCarouselButton>
        <ImageCarouselButton isRight onClick={createCycleCarousel(false)}>
          <RightArrow />
        </ImageCarouselButton>
      </ButtonWrapper>
    </ImageCarouselContainer>
  );
};

export default ImageCarousel;
