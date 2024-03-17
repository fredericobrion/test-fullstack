import { useState, useMemo } from "react";
import React from "react";
import { User } from "../../src/types/User";
import Context from "../../src/context/Context"

type ProviderProps = {
  children: React.ReactNode;
};

let usersInDb = [] as unknown as Promise<User[]>;

function ProviderMock({ children }: ProviderProps) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [userBeingCreated, setUserBeingCreated] = useState<User | null>(null);

  const getUsersFromDb = async () => {
    try {
      setLoading(true);
      const users = await usersInDb;
      setUsers(users);
    } catch (e: unknown) {
      setError((e as Error).message);
      throw new Error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const createUserInDb = async (user: User) => {
    try {
      setLoading(true);
      (await usersInDb).push(user);
      const userPromise = user as unknown as Promise<User>;
      const createdUser = await userPromise;
      setUsers([...users, createdUser]);
    } catch (e: unknown) {
      setError((e as Error).message);
      throw new Error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserInDb = async (user: User) => {
    setLoading(true);
    try {
      const updatedUsers = users.map((u) => {
        if (u.id === user.id) {
          return user;
        }
        return u;
      });
      usersInDb = updatedUsers as unknown as Promise<User[]>;
      setUsers(updatedUsers);
    } catch (e: unknown) {
      setError((e as Error).message);
      throw new Error((e as Error).message);
    } finally {
      setLoading(false);
    }
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

export default ProviderMock;
