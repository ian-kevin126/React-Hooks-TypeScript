import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import React from "react";
import { DevTools } from "jira-dev-tool/dist";

/**
 * 通用的flex组件
 * gap设置flexbox子元素之间的右边距，
 * between设置flexbox的justify-content属性是否为space-between
 * marginBottom设置flexbox下边距的属性
 */
export const Row = styled.div<{
  gap?: number | boolean | undefined;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin />
  </FullPage>
);

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
  </FullPage>
);
