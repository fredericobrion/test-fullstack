import { useState, useMemo } from "react";
import { User } from "../types/User";
import Context from "./Context";

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
};

function Provider({ children }: ProviderProps) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
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
    }),
    [loading, users, error]
  );

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export default Provider;
