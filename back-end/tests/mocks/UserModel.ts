import { User } from "../../src/classes/User";
import IUserModel from "../../src/interfaces/IUserModel";

export const users = [
  {
    id: 1,
    name: "João",
    email: "joao@uol.com",
    cpf: "123.456.789-85",
    phone: "(11) 9999-9999",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Maria",
    email: "maria@uol.com",
    cpf: "123.456.789-88",
    phone: "(11) 9999-9999",
    status: "ACTIVE",
  },
] as User[];

export class IUserMock implements IUserModel {
  private usersList: User[] = [...users];

  getUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      resolve(this.usersList);
    });
  }

  getUserById(id: number): Promise<User | null> {
    return new Promise((resolve) => {
      const user = this.usersList.find((u) => u.id === id);
      resolve(user || null);
    });
  }

  findUserByEmail(email: string): Promise<User | null> {
    return new Promise((resolve) => {
      const user = this.usersList.find((u) => u.email === email);
      resolve(user || null);
    });
  }

  finduserByCpf(cpf: string): Promise<User | null> {
    return new Promise((resolve) => {
      const user = this.usersList.find((u) => u.cpf === cpf);
      resolve(user || null);
    });
  }

  createUser(user: User): Promise<User> {
    return new Promise((resolve) => {
      const newUser = { ...user, id: this.usersList.length + 1 };
      this.usersList.push(newUser);
      resolve(newUser);
    });
  }

  updateUser(id: number, user: User): Promise<User> {
    return new Promise((resolve) => {
      const index = this.usersList.findIndex((u) => u.id === id);
      this.usersList[index] = { ...user, id };
      resolve(this.usersList[index]);
    });
  }
}
