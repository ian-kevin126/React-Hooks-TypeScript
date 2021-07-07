import React from "react";
import { Rate } from "antd";

// React.ComponentProps<typeof Rate>是用来做组件的属性透传，checked和onCheckedChange属性是我们外加的两个属性，如果要加入的属性
// 与组件本身的属性冲突了，就需要Omit去移除组件本身的属性，已解决冲突。
interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};
