// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { User } from "types/user";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

// 获取本地缓存中的token
export const getToken = () => window.localStorage.getItem(localStorageKey);

// 将登录或注册后得到的用户信息保存在localStorage中，再返回user信息
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      // 登录成功后，将token存在localStorage中，方便后面请求接口使用
      return handleUserResponse(await response.json());
    } else {
      // 一定要做登录失败处理，要返回一个错误，否则TypeScript类型检查会不通过
      return Promise.reject(await response.json());
    }
  });
};

// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      // 注册成功后，将token存在localStorage中，方便后面请求接口使用
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 退出
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
