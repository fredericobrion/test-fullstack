import { PrismaClient } from "@prisma/client";
import { User } from "../classes/User";

export default class UserPrismaDatabase {
  private prisma!: PrismaClient;

  constructor() {}

  async connect(): Promise<void> {
    this.prisma = new PrismaClient();
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }

  async findAll(): Promise<User[]> {
    const dataUser = await this.prisma.user.findMany() as User[];
    const users = dataUser.map((user) => new User(user));
    return users;
  }

  // async findById(id: number): Promise<User | null>{
  //   return await this.prisma.user.findUnique({ where: { id } });
  // }

  // async create(data: User): Promise<User> {
  //   return await this.prisma.user.create({ data });
  // }

  // async update(id: number, data: User): Promise<User | null>{
  //   return await this.prisma.user.update({ where: { id }, data });
  // }
}