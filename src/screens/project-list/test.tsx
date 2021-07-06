import React, { useEffect, useState } from "react";
import { useMount } from "../../utils";

function test() {
  let num = 0;
  const effect = () => {
    num += 1;
    const message = `现在的值是：${num}`;
    return function unMount() {
      console.log(message);
    };
  };
  return effect;
}

const add = test();
const unmount = add();
add();
add();
unmount(); // 由于add执行了三次，直觉上这里应该输出3，但实际上打出了1，这就是因为闭包

// React hook 与闭包经典的坑
export const Test = () => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("num in interval is: ", num);
    }, 1000);
    return () => clearInterval(timer);
  }, [num]);

  useEffect(() => {
    // 这里也是由于闭包，在页面卸载时会打印出0，所以在useEffect中遇到了闭包的问题，首先就要看看依赖项是否配置正确。
    return () => {
      console.log(num);
    };
  }, [num]);

  return (
    <div>
      <button onClick={() => setNum(num + 1)}>click</button>
      <div>{num}</div>
    </div>
  );
};
