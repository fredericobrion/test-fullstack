import React, { useState, useMemo } from "react";
import { User } from "../../src/types/User";
import Context from "../../src/context/Context";
import { users as usersList } from "./user";

type ProviderProps = {
  children: React.ReactNode;
};

export type ProviderValues = {
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  users: User[];
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
  userBeingCreated: User | null;
  setUserBeingCreated: (user: User | null) => void;
  calledApi: boolean;
  setCalledApi: (calledApi: boolean) => void;
};

function ProviderMock({ children }: ProviderProps) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>(usersList);
  const [error, setError] = useState<string>("");
  const [calledApi, setCalledApi] = useState<boolean>(false);
  const [userBeingCreated, setUserBeingCreated] = useState<User | null>(null);

  const values = useMemo(
    () => ({
      error,
      setError,
      loading,
      setLoading,
      users,
      setUsers,
      userBeingCreated,
      setUserBeingCreated,
      calledApi,
      setCalledApi,
    }),
    [loading, users, error]
  );

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export default ProviderMock;
