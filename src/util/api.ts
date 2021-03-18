/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import axios from 'axios';
import isLogin from '@util/auth/auth';

axios.defaults.baseURL = `${process.env.CLIENT_HOST}/api`;
axios.defaults.withCredentials = true;

export default {
  getQnAList: async () => {
    const response = await axios.get('/?action=get_faq_list&params={}');
    return response.data;
  },
  getMyQnA: async (page: number) => {
    const sid = sessionStorage.getItem('sid');
    if (!isLogin()) return {};
    const response = await axios.get(`/?action=get_my_qna&params={"page":${page}}&sid=${sid}`);
    return response.data;
  },
  postMyQnA: async (type: string, title: string, contents: string) => {
    const sid = sessionStorage.getItem('sid');
    if (!isLogin()) return {};
    const response = await axios.get(`/?action=set_qna&params={"type":"${type}","title":"${title}","contents":"${contents}"}&sid=${sid}`);
    return response.data;
  },
  login: async (formData: any) => {
    const response = await axios.post('/login', formData);
    return response;
  },
  getPlayerStatus:  async () => {
    const sid = sessionStorage.getItem('sid');
    const response = await axios.get(`/?action=get_player_status&params={}&sid=${sid}`);
    return response.data;
  },
  getUserInfo:  async () => {
    const sid = sessionStorage.getItem('sid');
    const response = await axios.get(`/?action=get_user_info&params={}&sid=${sid}`);
    
    console.log(response.data)
    return response.data;
  },
  getUnivData :  async (univ_code:string,lang:string) => {
    const sid = sessionStorage.getItem('sid');
    let params:{univ_code:string; lang?:string;} = {
      univ_code: univ_code
    }
    if(lang&&lang!=="ko"){
      params.lang = lang;
    }
    const response = await axios.get(`/?action=oneclick_univ&params=${JSON.stringify(params)}&sid=${sid}`);
    return response.data;
  },
  sendPlayerInfo: async (url:string) => {
    const response = await axios.get(url);
    console.log(response.data)
     return response.data;
  },
  getPlayerPayrank: async () => {
    const sid = sessionStorage.getItem('sid');
    const status_id = sessionStorage.getItem('userStatusId');
    const response = await axios.get(`/?action=get_player_payrank&params={"status_id":"${status_id}"}&sid=${sid}`);
    return response.data;
  },
  getPlayerDocument: async () => {
    const sid = sessionStorage.getItem('sid');
    const univ_code = sessionStorage.getItem('chooseUnivCode');
    const univ_info = sessionStorage.getItem('chooseUnivInfoType');
    const response = await axios.get(`/?action=get_player_document&params={"univ_code":"${univ_code}", "info_type":"${univ_info}"}&sid=${sid}`);
    return response.data;
  },
  getUniversityList: async () => {
    const response = await axios.get('/?action=get_univ_info_with_catch_phrase&params={}');
    return response.data.university;
  },
  getReviewList: async () => {
    const response = await axios.get('/?action=get_review&params={}');
    return response.data.university;
  },
};
