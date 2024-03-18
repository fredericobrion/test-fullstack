import { PrismaClient } from "@prisma/client";
import IUserModel from "../interfaces/IUserModel";
import { User } from "../classes/User";

export default class PrismaUserModel implements IUserModel {
  private db = new PrismaClient();

  constructor() {}

  async getUsers() {
    const users = (await this.db.user.findMany()) as User[];
    await this.db.$disconnect();
    return users;
  }

  async getUserById(id: number) {
    const user = (await this.db.user.findUnique({ where: { id } })) as User;
    await this.db.$disconnect();
    return user;
  }

  async createUser(user: User) {
    const newUser = (await this.db.user.create({ data: user })) as User;
    await this.db.$disconnect();
    return newUser;
  }

  async updateUser(id: number, user: User) {
    const updatedUser = (await this.db.user.update({
      where: { id },
      data: user,
    })) as User;
    await this.db.$disconnect();
    return updatedUser;
  }

  async findUserByEmail(email: string) {
    const user = (await this.db.user.findFirst({ where: { email } })) as User;
    await this.db.$disconnect();
    return user;
  }

  async finduserByCpf(cpf: string) {
    const user = (await this.db.user.findFirst({ where: { cpf } })) as User;
    await this.db.$disconnect();
    return user;
  }
}
