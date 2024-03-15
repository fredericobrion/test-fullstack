import { useState, useMemo } from "react";
import { User } from "../types/User";
import Context from "./Context";

type ProviderProps = {
  children: React.ReactNode;
};

export type ProviderValues = {
  loading: boolean;
  users: User[];
};

function Provider({ children }: ProviderProps) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const values = useMemo(
    () => ({
      loading,
      users,
    }),
    [loading, users]
  );

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export default Provider;
