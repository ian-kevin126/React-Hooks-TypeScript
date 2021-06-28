import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

// Config继承RequestInit中的所有的类型，外加token和data两个类型。
interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data ?? {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        // 401一般指的是未登录或者token失效的状态下，我们要手动将其退出
        await auth.logout();
        // 然后再刷新一下页面
        window.location.reload();
        return Promise.reject({ message: "请重新登录！" });
      }
      const data = response.json();
      if (response.ok) {
        return data;
      } else {
        // 当response不返回ok的时候，我们需要手动抛出一个Promise对象，这是因为fetch API不会在
        // 错误发生的情况下抛出异常，这使得我们难以处理错误。catch里面的逻辑不会生效。
        // axios则不同，它可以在状态部位2XX的时候抛出异常。
        return Promise.reject(data);
      }
    });
};

// 自动携带token的http hook
export const useHttp = () => {
  const { user } = useAuth();
  // return ([endpoint, config]: [string, Config]) => http(endpoint, { ...config, token: user?.token });
  // 由于([endpoint, config]: [string, Config])入参和http方法的入参相同，我们就可以使用Parameters这种高级特性去代替它的类型声明。
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
