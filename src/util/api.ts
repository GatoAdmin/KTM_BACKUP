/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import axios from 'axios';

axios.defaults.baseURL = `${process.env.CLIENT_HOST}/api`;
axios.defaults.withCredentials = true;

export default {
  getQnAList: async () => {
    const response = await axios.get('/?action=get_faq_list&params={}');
    return response.data;
  },
  getMyQnA: async (page: number) => {
    const sid = sessionStorage.getItem('sid');
    if (sid === null) return {};
    const response = await axios.get(`/?action=get_my_qna&params={"page":${page}}&sid=${sid}`);
    return response.data;
  },
};
