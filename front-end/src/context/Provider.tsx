import { useState, useMemo } from "react";
import { User } from "../types/User";
import Context from "./Context";
import { getAllUsers } from "../services/users";

type ProviderProps = {
  children: React.ReactNode;
};

export type ProviderValues = {
  loading: boolean;
  users: User[];
  getUsersFromDb: () => Promise<void>;
};

function Provider({ children }: ProviderProps) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const getUsersFromDb = async () => {
    setLoading(true);
    try {
      const users = await getAllUsers();
      setUsers(users);
    } catch (e: unknown) {
      console.log((e as Error).message);
    }
    setLoading(false);
  }

  const values = useMemo(
    () => ({
      loading,
      users,
      getUsersFromDb,
    }),
    [loading, users]
  );

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export default Provider;
