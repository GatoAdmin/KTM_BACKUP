/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import axios from 'axios';
import isLogin from '@util/auth/auth';

// axios.defaults.baseURL = `http://localhost:8000/api`;
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
    const response = await axios.get(
      `/?action=set_qna&params={"type":"${type}","title":"${title}","contents":"${contents}"}&sid=${sid}`,
    );
    return response.data;
  },
  login: async (formData: any) => {
    const response = await axios.post('/login', formData);
    return response;
  },
  getUniversityList: async () => {
    const response = await axios.get('/?action=get_univ_info_with_catch_phrase&params={}');
    return response.data.university;
  },
  getReviewList: async () => {
    const response = await axios.get('/?action=get_review&params={}');
    return response.data.university;
  },
  getUserInfo: async () => {
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
