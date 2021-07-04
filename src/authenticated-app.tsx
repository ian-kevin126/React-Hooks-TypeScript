import { ProjectListScreen } from "./screens/project-list";
import React from "react";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";

/**
 * 登录状态的app
 * @constructor
 */
export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const value: any = undefined;
  return (
    <Container>
      {value.NotExist}
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <Button type={"link"} onClick={logout}>
                    退出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type={"link"}>Hi，{user?.name}</Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;
// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 6rem 1fr 6rem;
//   grid-template-columns: 20rem 1fr 20rem;
//   grid-template-areas:
//     "header header header"
//     "nav main aside"
//     "footer footer footer";
//   height: 100vh;
//   grid-gap: 10rem;
// `;

// grid-area是用来给grid的子元素取名字的。
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;

// const Aside = styled.aside`
//   grid-area: aside;
// `;
// const Nav = styled.nav`
//   grid-area: nav;
// `;
// const Footer = styled.footer`
//   grid-area: footer;
// `;

// const PageHeader = styled.header`
// height: 6rem;
// `;
//
// const Main = styled.main`
// height: 100vh - 6rem;
// `;

/**
 * grid和flex的应用场景
 * 1，一般来说，一维布局用flex，二维布局用grid
 * 2，从内容出发用flex，我们先有一组内容（数量不固定），然后希望他们均匀地分布在容器中，并且由内容的大小决定占据的空间。
 * 3，从布局出发用grid，我们先规划网格（一般数量比较固定），然后再往里面填充元素。
 *
 */
