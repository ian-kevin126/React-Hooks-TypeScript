import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";
import { UserPopover } from "components/user-popover";

// prop drilling
/**
 * 登录状态下的app以及非登录状态下的app（unauthenticated-app）分开来写。
 * @constructor
 */
export default function AuthenticatedApp() {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={"/projects"} element={<ProjectListScreen />} />
          <Route path={"/projects/:projectId/*"} element={<ProjectScreen />} />
          <Navigate to={"/projects"} />
        </Routes>
      </Main>
      <ProjectModal />
    </Container>
  );
}

/**
 * 页头
 * @constructor
 */
const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

/**
 * 右侧的用户信息
 * @constructor
 */
const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              退出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  display: flex;
  overflow: hidden;
`;

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 *
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

// grid-template-areas的用法：
/**
 * const Container = styled.div`
 *   display: grid;
 *   grid-template-rows: 6rem 1fr 6rem;
 *   grid-template-columns: 20rem 1fr 20rem;
 *   grid-template-areas:
 * "header header header"
 * "nav main aside"
 * "footer footer footer";
 *   height: 100vh;
 *   grid-gap: 10rem;
 * `;
 *
 * const Header11 = styled.header`grid-area: header`
 * const Main = styled.main`grid-area: main`
 * const Nav = styled.nav`grid-area: nav`
 * const Aside = styled.aside`grid-area: aside`
 * const Footer = styled.footer`grid-area: footer`
 */
