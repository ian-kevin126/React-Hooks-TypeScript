import { useEffect, useState } from "react";

/**
 * 一般来说，需要封装成hook的方法，最好是方法的逻辑中也使用了别的hook。否则，写成公用util函数也是挺好的。
 */

/**
 * 组件初次加载时执行的useEffect逻辑
 * @param callback
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // 这一行是为了解决eslint检测在某些不需要添加依赖的hook中导致控制台产生的warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/**
 * 防抖函数
 * @param func
 * @param delay
 * @returns {function(...[*]=)}
 */
const debounce = (func: () => void, delay?: number) => {
  let timer: any;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setInterval(function () {
      func();
    }, delay);
  };
};

/**
 * 参数防抖
 * @param value
 * @param delay
 * @returns {unknown}
 */
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次value变化的时候就设置一个定时器，delay时间到了之后再改变value值，达到了防抖的作用
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // 每次useEffect执行完后，清理定时器
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

/**
 * 处理数组的hook
 * @param initialArray
 */
export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);

  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    removeIndex: (index: number) => {
      const _copy = [...value];
      _copy.splice(index, 1);
      setValue(_copy);
    },
    clear: () => setValue([]),
  };
};
