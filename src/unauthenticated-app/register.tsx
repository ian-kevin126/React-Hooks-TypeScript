import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";

interface Base {
  id: number;
}

interface Advanced extends Base {
  name: string;
}

const test = (a: Base) => {};

// const a: Advanced = { id: 12121, name: "kevin" };
// 明明定义的test函数的参数是要一个Base类型的参数，我们传入一个Advanced类型的参数，为啥不会报错？
// test(a);

// 这是因为TypeScript是鸭子类型：简单来说就是，面向接口编程，而不是面向对象编程。我们如果把变量a的类型声明关掉，可以发现，程序不会报错
// 这是因为，test函数虽然给参数指定了Base类型，但是只要你的参数符合Base类型中定义的属性要求，那就视为类型兼容。
const a = { id: 12121, name: "kevin" };
test(a);

export const RegisterScreen = () => {
  const { register } = useAuth();
  // 这里的FormEvent<HTMLFormElement>是由onSubmit事件指定的参数类型
  // FormEvent<T = Element> 指的是，T如果不指定类型，默认就是Element类型，也就是说，如果我们这里不指定FormEvent为HTMLFormElement类型，
  // 那么FormEvent就默认是Element类型。
  // interface HTMLFormElement extends HTMLElement { }
  // interface HTMLElement extends Element { }
  // 而 interface FormEvent<T = Element> extends SyntheticEvent<T> {}
  // 所以这里的HTMLFormElement继承了HTMLElement以及Element上的属性
  const handleOnSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // as HTMLInputElement就是类型断言，因为evt.currentTarget.elements[0]上没有value属性，
    // 我们就需要强制转成HTMLInputElement类型，才能取到value值。
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };

  return (
    <Form onFinish={handleOnSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名", whitespace: true }]}
      >
        <Input placeholder={"请输入用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码", whitespace: true }]}
      >
        <Input placeholder={"请输入密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type="primary">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
