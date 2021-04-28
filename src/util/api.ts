/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import axios from 'axios';
import isLogin from '@util/auth/auth';

axios.defaults.baseURL = `${process.env.CLIENT_HOST}/api`;
// axios.defaults.baseURL = `http://localhost:8000/api`;
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
    const response = await axios.get(
      `/?action=set_qna&params={"type":"${type}","title":"${title}","contents":"${contents}"}&sid=${sid}`,
    );
    return response.data;
  },
  login: async (formData: any) => {
    const response = await axios.post('/login', formData);
    return response;
  },
  getPlayerStatus: async () => {
    const sid = sessionStorage.getItem('sid');
    if (!isLogin()) return {};
    const response = await axios.get(`/?action=get_player_status&params={}&sid=${sid}`);
    return response.data;
  },
  getUserInfo: async () => {
    const sid = sessionStorage.getItem('sid');
    if (!isLogin()) return {};
    const response = await axios.get(`/?action=get_user_info&params={}&sid=${sid}`);
    return response.data;
  },
  getUnivData: async (univ_code: string, lang: string) => {
    if (!isLogin()) return {};
    const sid = sessionStorage.getItem('sid');
    if (univ_code === undefined || univ_code === null) return {};
    const params: { univ_code: string; lang?: string } = {
      univ_code,
    };
    if (lang && lang !== 'ko') {
      params.lang = lang;
    }
    const response = await axios.get(`/?action=oneclick_univ&params=${JSON.stringify(params)}&sid=${sid}`);
    return response.data;
  },
  sendPlayerInfo: async (url: string) => {
    if (!isLogin()) return {};
    const response = await axios.get(url);
    return response.data;
  },
  sendAccountTransfer: async (status_id: number, name: string) => {
    if (!isLogin()) return {};
    const sid = sessionStorage.getItem('sid');
    const params = {
      status_id,
      deposit_name: name,
    };
    const response = await axios.get(`/?action=pay_account_num&params=${JSON.stringify(params)}&sid=${sid}`);
    return response.data;
  },
  sendSuccessPayment: async (status_id: number, imp_uid: string, merchant_uid: string) => {
    if (!isLogin()) return {};
    const sid = sessionStorage.getItem('sid');
    const params = {
      status_id,
      imp_uid,
      merchant_uid,
    };
    const response = await axios.get(`/?action=pay_check_status&params=${JSON.stringify(params)}&sid=${sid}`);
    return response.data;
  },
  requestDocumentAction: async (url: string) => {
    if (!isLogin()) return {};
    const response = await axios.get(url);
    return response.data;
  },
  getPlayerPayrank: async () => {
    const sid = sessionStorage.getItem('sid');
    if (!isLogin()) return {};
    const status_id = sessionStorage.getItem('userStatusId');
    const response = await axios.get(`/?action=get_player_payrank&params={"status_id":"${status_id}"}&sid=${sid}`);
    return response.data;
  },
  getPlayerDocument: async (lang: string) => {
    const sid = sessionStorage.getItem('sid');
    if (!isLogin()) return {};
    const univ_code = sessionStorage.getItem('chooseUnivCode');
    const univ_info = sessionStorage.getItem('chooseUnivInfoType');

    const response = await axios.get(
      `/?action=get_player_document&params={"univ_code":"${univ_code}", "info_type":"${univ_info}","lang":"${
        lang !== 'ko' ? lang : ''
      }"}&sid=${sid}`,
    );

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
  getMyService: async () => {
    const response = await axios.get('/?action=get_my_service&params={}');
    return response.data;
  },
  getMyUniversityList: async (page: number) => {
    const response = await axios.get(`/?action=get_my_univ&params={"options":"created", "page":${page}}`);
    return response.data.value;
  },
  getMyInfomation: async () => {
    const response = await axios.get('?action=get_my_info&params={}');
    return response.data.value;
  },
  patchMyInfomation: async ({
    first_name, last_name, topik_level, identity, username,
  }: any) => {
    const response = await axios.get(
      `?action=change_my_info&params={"infos":{"last_name" : "${last_name}", "first_name":"${first_name}", "username":"${username}", "identity":${identity}, "topik_level":${topik_level}}}`,
    );
    return response.data;
  },
  getMyRefundInfo: async (payId: number) => {
    const response = await axios.get(`?action=get_refund_info&params={"id":${payId}}`);
    return response.data;
  },
  getUserLikeInfo: async () => {
    const sid = sessionStorage.getItem('sid');
    const response = await axios.get(`/?action=get_user_like_info&params={}&sid=${sid}`);
    return response.data;
  },
  pushLikeButton: async (univCode: string) => {
    const sid = sessionStorage.getItem('sid');
    const response = await axios.get(`/?action=push_like_button&params={"univ_code":"${univCode}"}&sid=${sid}`);
    return response.data;
  },
};
