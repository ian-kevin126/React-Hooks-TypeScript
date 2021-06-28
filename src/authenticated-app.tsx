// 登录状态的app

import { ProjectListScreen } from "./screens/project-list";
import React from "react";
import { useAuth } from "./context/auth-context";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>退出</button>
      <ProjectListScreen />
    </div>
  );
};
