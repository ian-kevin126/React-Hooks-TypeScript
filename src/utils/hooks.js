import { useEffect, useState } from "react";

/**
 * 一般来说，需要封装成hook的方法，最好是方法的逻辑中也使用了别的hook。否则，写成公用util函数也是挺好的。
 */

/**
 * 组件初次加载时执行的useEffect逻辑
 * @param callback
 */
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

/**
 * 防抖函数
 * @param func
 * @param delay
 * @returns {function(...[*]=)}
 */
const debounce = (func, delay) => {
  let timer;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setInterval(function () {
      func();
    }, delay);
  };
};

const log = debounce(() => console.log("log"), 5000);
log();
log();
log();

/**
 * 参数防抖
 * @param value
 * @param delay
 * @returns {unknown}
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次value变化的时候就设置一个定时器，delay时间到了之后再改变value值，达到了防抖的作用
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // 每次useEffect执行完后，清理定时器
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};
