import React from 'react';
import axios from 'axios';
import API from '@util/api';
import usePromise from '@util/hooks/usePromise';
import useTranslate from '@util/hooks/useTranslate';
import i18nResource from '@assets/i18n/solutionPage.json';
import { GetServerSideProps, NextPage } from 'next';
import Router, { withRouter } from 'next/router';
import { useSWRInfinite, responseInterface } from 'swr';
import Header from '@components/Shared/Header/Header';
import StepHeader, { getSelectUnivInfo, useSelecterEnter} from '@components/SolutionPage/StepHeader/StepHeader';
import DefaultLayout from '@components/Shared/DefaultLayout/DefaultLayout';
import RadioButton from '@components/SolutionPage/RadioButton/RadioButton';
import LineParser from '@components/SolutionPage/LineParser/LineParser';
import DocumentShortItem from '@components/SolutionPage/DocumentShortItem/DocumentShortItem';
import {STEP_STRING} from '@components/SolutionPage/StepString';
import {
  ColorBold,
  BlockHeader,
  Block,
  EmptyText,
  ReadyButton,
  SelectContainer,
  Tap,
  TapItem,
  TapContainer,
  RadioButtonContainer,
  DocumentShortContainer
} from '@components/SolutionPage/Common/Common.style';
import {
  ImageContainer,
  Accent,
  CoverImage
} from '@views/SolutionPage/SolutionSelectPage/SolutionSelectPage.style';

interface tap {
  name: string;
  type: string;
  index : number;
}


const getChosseUnivCode =()=>{
  let data = null;
  if(typeof window !=="undefined"){
    data = sessionStorage.getItem('chooseUnivCode');//|"KMU_UNI";
  }
  return data;
}
const getSesstionData =()=>{
  let data = null;
  if(typeof window !=="undefined"){
    const univ_code = getChosseUnivCode();
    let sessionData = sessionStorage.getItem('select_enter_value');
    if(sessionData&&sessionData!==""){
      sessionData=JSON.parse(sessionData);
    }else{
      sessionData = null;
    }
    if(univ_code &&sessionData&& univ_code===sessionData.univ_code){
      data = sessionData;
    }
  }
  return data;
}

// const fetchSendPlayerInfo = (url: string) => axios.get(url,{withCredentials : true})
//   .then((res) => {const {
//     update_userstatus,
//     userdocument
//   }: {
//     update_userstatus:{
//         id: number;
//         user_id: number;
//         univ_code: string;
//         info_type: string;
//         subjecttitle: string;
//         subjectname: string;
//         pay_rank: string;
//         pay_cost: string;
//         doc_cost:number;
//         pay_complete:boolean;
//       },
//       userdocument:{
//         essential: Array<{
//           name : string;
//           pictogram :string;
//         }>;
//         noessential: Array<{
//           name : string;
//           pictogram :string;
//         }>;
//       }
//     }  = res.data;
//     console.log(res.data)
//     window.sessionStorage.setItem("user_status",JSON.stringify({update_userstatus, userdocument}));
//     window.sessionStorage.setItem("user_status_id",String(update_userstatus.id));
//     return {update_userstatus, userdocument};
//   });
  


const convertTime = (timeStr: string)=>{
  const date = timeStr.replace(' / ','T');
  return new Date(date);
}
const getLeastTime=(admin:string,user:string)=>{
  return admin>user?admin:admin<user?user:admin;
}
const SolutionSelectPage: NextPage = ({
  router: {
    query: { lang: queryLang, univ: queryUniv },
  },
}) => {
  const { t, lang, changeLang } = useTranslate(i18nResource);
  React.useEffect(() => {
    if (queryLang !== undefined) {
      changeLang(queryLang);
    }
  }, [queryLang]);

  React.useEffect(() => {
    if (queryUniv !== undefined) {
      sessionStorage.setItem('chooseUnivCode',queryUniv);
    }
  }, [queryUniv]);

  React.useEffect(() => {
    API.getPlayerStatus()
    .then((data)=>{
      console.log(data);
      if (data.status !== 'success') {
        console.log(data);
      } else { //통신 성공
          const univ_code = getChosseUnivCode();
          if(univ_code!==null){//선택된 univ_code가 있는지 체크한다.
            if(data.userstatus_list.some(us=>us.univ_code === univ_code)){
              const user = data.userstatus_list.find(us=>us.univ_code === univ_code);
              if(typeof window !== "undefined"){
                sessionStorage.setItem('chooseUnivCode',user.univ_code);
                sessionStorage.setItem('chooseUnivName',user.univ_name);
                user.subjectname?sessionStorage.setItem('chooseSubjectname',user.subjectname):null;
                user.pay_rank?sessionStorage.setItem('choosePayRank',user.pay_rank):null;
              }
              if(user.step === STEP_STRING.STEP_TWO){
                if(user.pay_rank===null){
                  Router.push(`/solution/2${queryLang?`?lang=${queryLang}`:''}`)
                }else{
                  Router.push(`/solution/2/payment${queryLang?`?lang=${queryLang}`:''}`)
                }
              }else if(user.step === STEP_STRING.STEP_TWO_PENDING){
                Router.push(`/solution/2/paymentWating${queryLang?`?lang=${queryLang}`:''}`)
              }else if(user.step === STEP_STRING.STEP_THREE_INIT||user.step === STEP_STRING.STEP_THREE_PENDING){
                Router.push(`/solution/3${queryLang?`?lang=${queryLang}`:''}`)
              }else if(user.step === STEP_STRING.STEP_FOUR){
                Router.push(`/solution/4${queryLang?`?lang=${queryLang}`:''}`)
              }else if(user.step === STEP_STRING.STEP_FIVE||user.step === STEP_STRING.STEP_SIX){
                Router.push(`/solution/5${queryLang?`?lang=${queryLang}`:''}`)
              }
            }else{
              sessionStorage.setItem('chooseUnivCode', univ_code);
            }
          }else{//선택된 univ_code 이 없는 경우
            const user = data.userstatus_list.sort(function(a,b){
              const atime = getLeastTime(a.admin_end_check_datetime,a.user_end_check_datetime);//convertTime(a.updated_at);
              const btime = getLeastTime(b.admin_end_check_datetime,b.user_end_check_datetime);//convertTime(b.updated_at);
              atime>btime?1:atime<btime?-1:0;
            })[0];
  
            if(typeof window !== "undefined"){
              sessionStorage.setItem('chooseUnivCode',user.univ_code);
              sessionStorage.setItem('chooseUnivName',user.univ_name);
              user.subjectname?sessionStorage.setItem('chooseSubjectname',user.subjectname):null;
              user.pay_rank?sessionStorage.setItem('choosePayRank',user.pay_rank):null;
            }
            
            if(user.step === STEP_STRING.STEP_TWO){
              Router.push(`/solution/2${queryLang?`?lang=${queryLang}`:''}`)
            }else if(user.step === STEP_STRING.STEP_THREE_INIT||user.step === STEP_STRING.STEP_THREE_PENDING){
              Router.push(`/solution/3${queryLang?`?lang=${queryLang}`:''}`)
            }else if(user.step === STEP_STRING.STEP_FOUR){
              Router.push(`/solution/4${queryLang?`?lang=${queryLang}`:''}`)
            }else if(user.step === STEP_STRING.STEP_FIVE||user.step === STEP_STRING.STEP_SIX){
              Router.push(`/solution/5${queryLang?`?lang=${queryLang}`:''}`)
            }
          }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  if(typeof window !== "undefined"){
    const getUnivInfo=async()=>{
      const data = await getSelectUnivInfo(queryLang);
      return data;
    }
    let sessionData = getSesstionData();
    const [selectValue, handleSelectEnter]= useSelecterEnter(sessionData?sessionData:{univ_code:getChosseUnivCode(),enter_type:"new_enter"});
    let viewType = selectValue?typeof selectValue.major_type==="string"?selectValue.major_type:"인문":"인문";
    const [viewTap,setViewTaps] = React.useState({type:viewType}); 
  
    const [loading, resolved, error] = usePromise(getUnivInfo, []);
    if (loading) return <div></div>; 
    if (error) window.alert('API 오류');
    if (!resolved) return null;
    const {univ_info, major, document} = resolved;
    console.log(univ_info)
    const taps: Array<tap> = [
      {
        name: t('academic-type'),
        type: '인문',
        index: 1,
      },
      {
        name: t('natural-world-type'),
        type: '자연',
        index: 2,
      },
      {
        name: t('art-and-physical-type'),
        type: '예체능',
        index: 3,
      }
    ];

    const changeViewTap =(type:string)=>{
      setViewTaps({type:type});
      handleSelectEnter();
    }

    const isFinal = () =>{
      if(univ_info){
        if(selectValue!==null&&typeof selectValue.major_str==="string"){
          return true;
        }
      }
      return false;
    }
    
  const sendPlayerInfo = () => {
    let sid = 0; 
    if(typeof window !== "undefined"){
      sid = window.sessionStorage.getItem('sid');
    }
    const params = {
      univ_code : getChosseUnivCode(),
      info_type : univ_info.category,
      subjecttitle:selectValue.major_type,
      subjectname:selectValue.major_str,
    };
    const key= `/?action=set_player_status&params=${JSON.stringify(params)}&sid=${sid}`;
    console.log(key);

    API.sendPlayerInfo(key).then(
      data=>{
        if(data.status==="success"){
          const {update_userstatus, userdocument} = data;
          window.sessionStorage.setItem("user_status",JSON.stringify({update_userstatus, userdocument}));
          window.sessionStorage.setItem("user_status_id",String(update_userstatus.id));
          Router.push(`/solution/2${queryLang?`?lang=${queryLang}`:''}`)
          return true;
        }else{
          window.alert(t('warn-2'));
          return false;
        }
      }
    )
    return false;
  };
  const onClickNextStep=(isFinal:boolean)=>{
    if(isFinal){
        sendPlayerInfo();
    }else{
      window.alert(t('warn-1'));
    }
  }
    return (
      <DefaultLayout>
        <Header t={t} lang={lang} changeLang={changeLang} background="light" position="relative" />
        <StepHeader step={1} major_str={ selectValue?typeof selectValue.major_str==="string"?selectValue.major_str:null:null} t={t} lang={lang} changeLang={changeLang}/>
        <Block>
          <BlockHeader>{t('select-enter-type')}</BlockHeader>
          {univ_info
            ?<RadioButtonContainer>
              <RadioButton id="new_enter" group="enter_type" value="new_enter" checked={selectValue?.enter_type==="new_enter"} onChange={handleSelectEnter}>{t('new-enter')}</RadioButton>
              {/* <RadioButton id="transfer_enter" group="enter_type" value="transfer_enter" checked={selectValue?.enter_type==="transfer_enter"} onChange={handleSelectEnter}>{t('transfer-enter')}</RadioButton> */}
            </RadioButtonContainer>
            :<EmptyText>
              {t('first-select-university-button')}
            </EmptyText>
          }
        </Block>
        <Block>
          <BlockHeader>{t('select-major')}</BlockHeader>
          <SelectContainer>
          <TapContainer>
            <Tap>
                {taps.map(({ name, type, index }) => (
                    <TapItem key={index} isViewTap={viewTap.type===type} onClick={()=>changeViewTap(type)}>
                        {name}
                    </TapItem>
                ))}
            </Tap>
          </TapContainer>
          </SelectContainer>
          {major
            ?selectValue!==null&&typeof selectValue.enter_type==="string"
              ?<RadioButtonContainer>
                  {major[viewTap.type].map((name:string,index:number) => (
                    <RadioButton id={`${viewTap.type}_${index}`} key={index} group="major_str" value={name} checked={selectValue?.major_str===name} onChange={handleSelectEnter}>
                          {name}
                      </RadioButton>
                  ))}
              </RadioButtonContainer>
              :<EmptyText>
                  {t('first-select-university-and-enter-type')}
                </EmptyText>
            :<EmptyText>
              {t('first-select-university-and-enter-type')}
            </EmptyText>
          }
        </Block>
        <Block>
          <BlockHeader>{t('submission-guide')}</BlockHeader>
          {document
            ?selectValue!==null&&typeof selectValue.major_str==="string"
              ?<div>
                <ColorBold>{t('require-submission')}</ColorBold>
                <DocumentShortContainer>
                {document.essential.map(({name, pictogram})=>(
                  <DocumentShortItem pictogram={pictogram}>
                    {name}
                  </DocumentShortItem>
                  ))
                }
                </DocumentShortContainer>
                <ColorBold>{t('selection-submission')}</ColorBold>
                <DocumentShortContainer>
                {document.noessential.map(({name, pictogram})=>(
                  <DocumentShortItem pictogram={pictogram}>
                    {name}
                  </DocumentShortItem>
                  ))
                }
                </DocumentShortContainer>
                </div>
              :<EmptyText>
                  {t('first-select-major')}
              </EmptyText>
            :<EmptyText>
              {t('first-select-major')}
            </EmptyText>
          }
        </Block>
        <Block>
          <ReadyButton isReady={isFinal()} onClick={(e)=>onClickNextStep(isFinal())}>{t('next-step')}</ReadyButton>
        </Block>
        <ImageContainer>
          <CoverImage/>
          <LineParser str={t('katumm-welecom')}/>
        </ImageContainer>
      </DefaultLayout>
    );  
  }
  return <DefaultLayout></DefaultLayout>
};

export default withRouter(SolutionSelectPage);
