import * as React from 'react';
import { NextPage } from 'next';
import UserLayout from '@components/UserPage/UserPageLayout/UserLayout';
import {
	InputGroup,
	MoreInformationForm,
	MoreInformationTitle,
	SubmitButton,
	TextInput,
} from '@views/UserPage/MoreInformationPage/MoreInformationPage.style';
import Select from '@components/UserPage/Select/Select';

const countryArray = ['가나', '가봉', '가이아나', '감비아', '과테말라', '그레나다', '대한민국'];
const reasonArray = [
	'한국유학에 관심이 있거나 준비 중입니다.',
	'한국어학원에서 공부하며 대학교 입학을 준비 중입니다.',
	'한국의 대학교에서 공부하는 대학생입니다.',
	'일반인',
];

const MoreInformationPage: NextPage = () => {
	return (
		<UserLayout width={524} height={504}>
			<MoreInformationTitle>
				OO님,
				<br />
				남은 절차를 완료해주세요.
			</MoreInformationTitle>
			<MoreInformationForm>
				<InputGroup>
					<TextInput placeholder="영문이름" />
				</InputGroup>
				<InputGroup>
					<Select options={countryArray} placeholder="국가선택" />
				</InputGroup>
				<InputGroup>
					<Select placeholder="현재 준비 중이신 단계를 입력해주세요." options={reasonArray} />
				</InputGroup>
				<SubmitButton>완료</SubmitButton>
			</MoreInformationForm>
		</UserLayout>
	);
};

export default MoreInformationPage;
