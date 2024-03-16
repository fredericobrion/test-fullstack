import axios, { AxiosError } from "axios";
import { User } from "../types/User";
const HOST = import.meta.env.VITE_REACT_API_URL || "http://localhost:3001";

type ErrorFromApi = {
  data: { message: string };
};

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${HOST}/users`);
    return response.data as Promise<User[]>;
  } catch (e: unknown) {
    console.log((e as Error).message);
    return [];
  }
};

const createUser = async (user: User) => {
  try {
    const createdUser = await axios.post(`${HOST}/users`, user);
    return createdUser.data as User;
  } catch (e: unknown){
    if (e.response && e.response.data && e.response.data.message) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error("Erro ao criar usuário");
    }
  }
};

const updateUser = async (user: User) => {
  try {
    await axios.put(`${HOST}/users/${user.id}`, user, {
      params: { id: user.id },
    });
  } catch (e: unknown) {
    console.log((e as Error).message);
  }
};

export { getAllUsers, createUser, updateUser };
