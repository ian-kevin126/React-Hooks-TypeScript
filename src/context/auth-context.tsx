import React, { ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { User } from "types/user";
import { useQueryClient } from "react-query";

interface AuthForm {
  username: string;
  password: string;
}

// 页面刷新/初始化时校验token在缓存中存在的操作
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // 如果有token，就请求一下账户信息接口，将用户信息存在user里，保持在登录状态
    const data = await http("me", { token });
    user = data.user;
  }

  return user;
};

const AuthContext =
  React.createContext<
    | {
        user: User | null;
        register: (form: AuthForm) => Promise<void>;
        login: (form: AuthForm) => Promise<void>;
        logout: () => Promise<void>;
      }
    | undefined
  >(undefined);

AuthContext.displayName = "AuthContext";

// 登录鉴权的Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const queryClient = useQueryClient();

  // 函数式编程的point free ——> (user) => setUser(user)  等价于  setUser
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });

  useMount(
    useCallback(() => {
      // 页面刷新的时候，先从本地缓存中查询是否有token
      // 解决登录以后，页面刷新后，user被重置为null导致的退出问题
      run(bootstrapUser());
    }, [])
  );

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  // 将user、login、register、logout四个全局的鉴权相关属性和方法通过AuthContext共享出去
  // 在其他组件中，就可以通过useAuth拿到这四个属性和方法
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// 自定义hook，将context暴露出去
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
