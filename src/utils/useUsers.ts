import { useAsync } from "./use-async";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";
import { User } from "../screens/project-list/search-panel";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();

  useEffect(() => {
    run(client("users", { data: cleanObject(param ?? {}) }));
  }, [param]);

  return result;
};
