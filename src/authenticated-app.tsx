import { ProjectListScreen } from "./screens/project-list";
import React from "react";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";

/**
 * 登录状态的app
 * @constructor
 */
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>退出</button>
        </HeaderRight>
      </Header>
      <Nav>Nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>Aside</Aside>
      <Footer>Footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
  grid-gap: 10rem;
`;

// grid-area是用来给grid的子元素取名字的。
const Header = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;

const Aside = styled.aside`
  grid-area: aside;
`;
const Main = styled.main`
  grid-area: main;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Footer = styled.footer`
  grid-area: footer;
`;

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
