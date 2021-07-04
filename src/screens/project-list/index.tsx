import React, { useEffect, useState } from "react";
import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
import { useDebounce, useMount } from "../../utils/hooks";
import { useHttp } from "../../utils/http";
import { cleanObject } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "../../utils/use-async";
import ts from "typescript/lib/tsserverlibrary";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/useUsers";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  // const [list, setList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);

  const client = useHttp();

  // 把这一块再抽象出来
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  // useEffect(() => {
  //   run(client("projects", { data: cleanObject(debouncedParam) }));
  //   // setIsLoading(true);
  //   // client("projects", { data: cleanObject(debouncedParam) })
  //   //   .then(setList)
  //   //   .catch(err => {
  //   //     setList([]);
  //   //     err.then((res: any) => {
  //   //       setError(res);
  //   //     });
  //   //   })
  //   //   .finally(() => setIsLoading(false));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedParam]);

  // useMount(() => {
  //   client("users").then(setUsers);
  // });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users ?? []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List users={users ?? []} dataSource={list ?? []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
