import { User } from "../classes/User";

export default interface IUserModel {
  getUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  createUser(user: User): Promise<User>;
  updateUser(id: number, user: User): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  finduserByCpf(cpf: string): Promise<User | null>;
}
