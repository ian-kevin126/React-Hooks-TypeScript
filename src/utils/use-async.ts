// idle代表空闲状态，loading代表正在进行的状态，error代表出错的状态，success代表成功的状态
import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

// 默认的初始数据
const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

/**
 *
 * @param initialState  用户传入的初始数据
 * @param initConfig  因为我们不是每次都希望抛出一个promise异常，有时候也希望直接抛出error。
 */
export const useAsync = <D>(
  initialState?: State<D>,
  initConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  // 更新数据
  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  // 发生错误时
  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  // run用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型数据!");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        // 这里的catch会主动消化异常，不会抛出异常，我们应该在return里主动抛出异常。
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        }
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
