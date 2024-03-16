import { useState, useMemo } from "react";
import { User } from "../types/User";
import Context from "./Context";
import { getAllUsers, createUser, updateUser } from "../services/users";

type ProviderProps = {
  children: React.ReactNode;
};

export type ProviderValues = {
  error: string;
  setError: (error: string) => void;
  loading: boolean;
  users: User[];
  setLoading: (loading: boolean) => void;
  getUsersFromDb: () => Promise<void>;
  createUserInDb: (user: User) => Promise<void>;
  updateUserInDb: (user: User) => Promise<void>;
  userBeingCreated: User | null;
  setUserBeingCreated: (user: User | null) => void;
};

function Provider({ children }: ProviderProps) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [userBeingCreated, setUserBeingCreated] = useState<User | null>(null);

  const getUsersFromDb = async () => {
    setLoading(true);
    const users = await getAllUsers();
    setUsers(users);
    setLoading(false);
  };

  const createUserInDb = async (user: User) => {
    try {
      setLoading(true);
      const createdUser = (await createUser(user)) as User;
      setUsers([...users, createdUser]);
      setLoading(false);
    } catch (e: unknown) {
      setError((e as Error).message);
      throw new Error((e as Error).message);
    }
  };

  const updateUserInDb = async (user: User) => {
    setLoading(true);
    try {
      await updateUser(user);
      const updatedUsers = users.map((u) => {
        if (u.id === user.id) {
          return user;
        }
        return u;
      });
      setUsers(updatedUsers);
    } catch (e: unknown) {
      console.log((e as Error).message);
    }
    setLoading(false);
  };

  const values = useMemo(
    () => ({
      error,
      setError,
      loading,
      setLoading,
      users,
      getUsersFromDb,
      createUserInDb,
      updateUserInDb,
      userBeingCreated,
      setUserBeingCreated,
    }),
    [loading, users, error]
  );

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export default Provider;
