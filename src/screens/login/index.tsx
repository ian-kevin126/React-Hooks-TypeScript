import React, { FormEvent } from "react";

export const LoginScreen = () => {
  // 这里的FormEvent<HTMLFormElement>是由onSubmit事件指定的参数类型
  // FormEvent<T = Element> 指的是，T如果不指定类型，默认就是Element类型，也就是说，如果我们这里不指定FormEvent为HTMLFormElement类型，
  // 那么FormEvent就默认是Element类型。
  const handleOnSubmit = (evt: FormEvent<HTMLFormElement>) => {};

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="username">用户名：</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码：</label>
        <input type="password" id={"password"} />
      </div>
      <button type="button">登录</button>
    </form>
  );
};
