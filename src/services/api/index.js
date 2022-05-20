import axios from 'axios';
import config from '../../config/config.json';
import { getLocalStorage } from '../storage/LocalStorage';

const BE = config.Backend;
const basePath = `http://${BE.host}:${BE.port}`;


export default async function createApiRequest({ url, method, data, params, token_google }) {
  const token_login = getLocalStorage("token_login");
  try {
    const result = await axios({
      headers: {
        token_google: token_google,
        token_login,
      },
      method,
      url: `${basePath}${url}`,
      data,
      params,
      withCredentials: true,
    });
    return {
      success: true,
      data: result.data,
    };
  } catch (e) {
    const { response } = e;
    return {
      success: false,
      data: response,
    };
  }
}
