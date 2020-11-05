import * as React from 'react';
import { NextPage } from 'next';
import Header from '@components/Shared/Header/Header';
import FilterModal, { FilterModalRef } from '@components/RecommendPage/FilterModal/FilterModal';
import {
	FilterContainer,
	FilterIconContainer,
	FilterShowButton,
	FilterShowIcon,
	FilterShowLabel,
	SearchBar,
	SearchBarContainer,
	SearchButton,
	SearchIcon,
	SearchInput,
	SearchSection,
	SearchSectionContainer,
	FilterIconDescription,
	FilterButton,
	FilterInputContainer,
	CheckBox,
	FilterCheckBoxContainer,
	FilterCheckBoxLabel,
	FilterCheckLabelBox,
	SearchFilter,
	LocationFilterCheckBoxContainer,
	LocationFilterCheckBoxLabel,
	LocationFilterCheckLabelBox,
	TuitionFilterCheckBoxContainer,
	TuitionFilterCheckBoxLabel,
	TuitionFilterCheckLabelBox,
	TopikFilterCheckLabelBox,
	TopikFilterCheckBoxLabel,
	TopikFilterCheckBoxContainer,
	UnivListSection,
	UnivListTitle,
	UnivListPagination,
	UnivListPrevButton,
	UnivListNextButton,
} from '@views/RecommendPage/RecommendPage.style';
import UnivItem from '@components/RecommendPage/UnivItem/UnivItem';
import LocationIcon from '../../assets/location.svg';
import EducationIcon from '../../assets/education-cost.svg';
import LicenseIcon from '../../assets/driving-license.svg';
import GrantIcon from '../../assets/grant.svg';
import DiversifyIcon from '../../assets/diversify.svg';
import CheckIcon from '../../assets/check.svg';

const location: Array<string> = [
	'서울',
	'인천',
	'경기',
	'강원',
	'대전',
	'세종',
	'충남',
	'충북',
	'부산',
	'대구',
	'울산',
	'경남',
	'경북',
	'광주',
	'전남',
	'전북',
	'제주',
];
// @ts-ignore
const tuitionFee: Array<number> = Array.apply(null, { length: 10 }).map((_, index) => (index + 1) * 100);
const topik: Array<string> = ['1급', '2급', '3급', '4급', '5급', '6급'];
const univList = [
	{
		name: '한국외국어대학교',
		address: '서울특별시 동대문구 이문로 107',
		topik: 6,
		grant: true,
		tuitionFee: 710,
		type: '4년제',
		thumbnail: '/images/aboard.jpg',
		logo: '/images/aboard_logo.svg',
	},
	{ name: '한림대학교', address: '강원도 춘천시 한림대학길 1', topik: 4, grant: true, tuitionFee: 740, type: '4년제' },
	{ name: '한림대학교', address: '강원도 춘천시 한림대학길 1', topik: 4, grant: true, tuitionFee: 740, type: '4년제' },
	{ name: '한림대학교', address: '강원도 춘천시 한림대학길 1', topik: 4, grant: true, tuitionFee: 740, type: '4년제' },
	{ name: '한림대학교', address: '강원도 춘천시 한림대학길 1', topik: 4, grant: true, tuitionFee: 740, type: '4년제' },
	{ name: '한림대학교', address: '강원도 춘천시 한림대학길 1', topik: 4, grant: true, tuitionFee: 740, type: '4년제' },
];

const useStateWithToggle = (initialState: boolean) => {
	const [toggle, setToggle] = React.useState<boolean>(initialState);

	return [toggle, () => setToggle((state) => !state), setToggle] as const;
};

const RecommendPage: NextPage = () => {
	const [filterShow, toggleFilterShow] = useStateWithToggle(false);
	const [locationModalShow, toggleLocationModal, setLocationModalShow] = useStateWithToggle(false);
	const locationModalRef = React.useRef<FilterModalRef>(null);
	const [tuitionFeeModalShow, toggleTuitionFeeModal, setTuitionFeeModalShow] = useStateWithToggle(false);
	const tuitionFeeModalRef = React.useRef<FilterModalRef>(null);
	const [topikModalShow, toggleTopikFeeModal, setTopikFeeModalShow] = useStateWithToggle(false);
	const topikModalRef = React.useRef<FilterModalRef>(null);
	const [page, setPage] = React.useState<number>(1);
	const onClickModal = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	return (
		<>
			<Header />
			<SearchSectionContainer>
				<SearchSection>
					모든 대학을 알려드립니다
					<SearchBarContainer>
						<SearchBar>
							<SearchInput />
							<SearchButton>
								<SearchIcon src="/images/search.png" />
							</SearchButton>
						</SearchBar>
						<FilterShowButton onChange={toggleFilterShow} />
						<FilterShowLabel>
							<FilterShowIcon />
						</FilterShowLabel>
					</SearchBarContainer>
					<FilterContainer show={filterShow}>
						<SearchFilter onClick={onClickModal}>
							<FilterButton onClick={toggleLocationModal}>
								<LocationIcon />
								<FilterIconDescription>위치</FilterIconDescription>
							</FilterButton>
							<FilterModal
								visible={locationModalShow}
								setVisible={setLocationModalShow}
								ref={locationModalRef}
								width="634px"
								height="230px"
							>
								{location.map((locationValue, index) => (
									<LocationFilterCheckBoxContainer key={locationValue}>
										<CheckBox id={`location-${index}`} />
										<LocationFilterCheckBoxLabel htmlFor={`location-${index}`}>
											{locationValue}
											<LocationFilterCheckLabelBox>
												<CheckIcon />
											</LocationFilterCheckLabelBox>
										</LocationFilterCheckBoxLabel>
									</LocationFilterCheckBoxContainer>
								))}
							</FilterModal>
						</SearchFilter>

						<SearchFilter onClick={onClickModal}>
							<FilterButton onClick={toggleTuitionFeeModal}>
								<EducationIcon />
								<FilterIconDescription>등록금</FilterIconDescription>
							</FilterButton>
							<FilterModal
								visible={tuitionFeeModalShow}
								setVisible={setTuitionFeeModalShow}
								ref={tuitionFeeModalRef}
								description="연평균 기준"
								width="634px"
								height="230px"
							>
								{tuitionFee.map((tuitionFeeValue, index) => (
									<TuitionFilterCheckBoxContainer key={tuitionFeeValue}>
										<CheckBox id={`tuition-${index}`} onChange={() => console.log('시발')} />
										<TuitionFilterCheckBoxLabel htmlFor={`tuition-${index}`}>
											{tuitionFeeValue} ~ {tuitionFeeValue + 100}만원
											<TuitionFilterCheckLabelBox>
												<CheckIcon />
											</TuitionFilterCheckLabelBox>
										</TuitionFilterCheckBoxLabel>
									</TuitionFilterCheckBoxContainer>
								))}
							</FilterModal>
						</SearchFilter>

						<SearchFilter onClick={onClickModal}>
							<FilterButton onClick={toggleTopikFeeModal}>
								<LicenseIcon />
								<FilterIconDescription>TOPIK</FilterIconDescription>
							</FilterButton>
							<FilterModal
								visible={topikModalShow}
								setVisible={setTopikFeeModalShow}
								ref={topikModalRef}
								width="460px"
								height="167px"
							>
								{topik.map((topikValue, index) => (
									<TopikFilterCheckBoxContainer key={topikValue}>
										<CheckBox id={`topik-${index}`} />
										<TopikFilterCheckBoxLabel htmlFor={`topik-${index}`}>
											{topikValue}
											<TopikFilterCheckLabelBox>
												<CheckIcon />
											</TopikFilterCheckLabelBox>
										</TopikFilterCheckBoxLabel>
									</TopikFilterCheckBoxContainer>
								))}
							</FilterModal>
						</SearchFilter>

						<FilterIconContainer>
							<GrantIcon />
							<FilterIconDescription>외국인 장학금</FilterIconDescription>
							<FilterInputContainer>
								<FilterCheckBoxContainer>
									<CheckBox id="exist" />
									<FilterCheckBoxLabel htmlFor="exist">
										<FilterCheckLabelBox>
											<CheckIcon />
										</FilterCheckLabelBox>
										있음
									</FilterCheckBoxLabel>
								</FilterCheckBoxContainer>
								<FilterCheckBoxContainer>
									<CheckBox id="non-exist" />
									<FilterCheckBoxLabel htmlFor="non-exist">
										<FilterCheckLabelBox>
											<CheckIcon />
										</FilterCheckLabelBox>
										없음
									</FilterCheckBoxLabel>
								</FilterCheckBoxContainer>
							</FilterInputContainer>
						</FilterIconContainer>

						<FilterIconContainer>
							<DiversifyIcon />
							<FilterIconDescription>대학 종류</FilterIconDescription>
							<FilterInputContainer>
								<FilterCheckBoxContainer>
									<CheckBox id="four" />
									<FilterCheckBoxLabel htmlFor="four">
										<FilterCheckLabelBox>
											<CheckIcon />
										</FilterCheckLabelBox>
										4년제
									</FilterCheckBoxLabel>
								</FilterCheckBoxContainer>
								<FilterCheckBoxContainer>
									<CheckBox id="two" />
									<FilterCheckBoxLabel htmlFor="two">
										<FilterCheckLabelBox>
											<CheckIcon />
										</FilterCheckLabelBox>
										전문대
									</FilterCheckBoxLabel>
								</FilterCheckBoxContainer>
								<FilterCheckBoxContainer>
									<CheckBox id="institute" />
									<FilterCheckBoxLabel htmlFor="institute">
										<FilterCheckLabelBox>
											<CheckIcon />
										</FilterCheckLabelBox>
										어학원
									</FilterCheckBoxLabel>
								</FilterCheckBoxContainer>
							</FilterInputContainer>
						</FilterIconContainer>
					</FilterContainer>
				</SearchSection>
			</SearchSectionContainer>
			<UnivListSection>
				<UnivListTitle>대학 리스트</UnivListTitle>
				{univList.map((univItem) => (
					<UnivItem key={univItem.name} {...univItem} />
				))}
			</UnivListSection>
			<UnivListPagination>
				<UnivListPrevButton />
				{page}
				<UnivListNextButton />
			</UnivListPagination>
		</>
	);
};

export default RecommendPage;
