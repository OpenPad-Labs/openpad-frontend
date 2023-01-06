import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// request interceptors
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptors
request.interceptors.response.use(
  ({ data }: AxiosResponse) => {
    if (data.code === 0 || data.code === 200) {
      return data.result;
    } else {
      console.log('Api Error:', data.message);
      // apiErrorMessage(data.message)
      return Promise.reject(data.message);
    }
  },
  (error) => {
    let msg = error?.message;
    if (error && error.response) {
      if (error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      } else {
        msg = error.response.data;
      }
    }
    // apiErrorMessage(msg)
    console.log('api response error: ', error);
    return Promise.reject(msg);
  }
);

// export const _get = <T>(url: string, query: object): Promise<T> => {
//   return request.get(url, { params: query })
// }
export function _get<T>(url: string, query: object): Promise<T> {
  return request.get(url, { params: query });
}
export function _post<T>(url: string, body: object): Promise<T> {
  return request.post(url, body);
}
