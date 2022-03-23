import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DevTools, loadServer } from "jira-dev-tool";
// 务必在jira-dev-tool后面引入
import "antd/dist/antd.less";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <DevTools />
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  )
);
