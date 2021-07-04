import React from "react";
import { User } from "./search-panel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          align: "left",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          align: "center",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          align: "center",
          render: (value, project) => {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ??
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          align: "center",
          render: (value, project) => {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      pagination={false}
      {...props}
    />
  );
};
