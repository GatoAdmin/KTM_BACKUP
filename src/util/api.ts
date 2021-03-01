/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import axios from 'axios';

axios.defaults.baseURL = `${process.env.API_PATH}/api`;

export default {
  getQnAList: async () => {
    const response = await axios.get('/?action=get_faq_list&params={}');
    return response.data;
  },
};
