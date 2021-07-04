import React, { ReactNode } from "react";

/**
 * React 官网：如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch()
 * 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。
 *
 * 所以这里我们就不能用function组件了，需要写成class组件，这也是为什么React Hooks目前还无法完全替代class组件的原因。
 * 因为尚有一部分react的生命周期无法在Hooks中得到实现。
 */

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// PropsWithChildren是React定义的一种Utility Type，意思是将children属性和尖括号里的属性联合起来
//  type PropsWithChildren<P> = P & { children?: ReactNode };
// React.Component<P, S>里面的P指的是props，S指的是State
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 定义获取错误的静态方法，这个生命周期钩子会在ErrorBoundary这个组件的子组件发生渲染错误的时候，就会调用这个方法，返回的值会赋给state里的error。
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallbackRender } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
