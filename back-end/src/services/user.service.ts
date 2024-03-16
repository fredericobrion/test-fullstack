import { PrismaClient } from "@prisma/client";
import { User } from "../classes/User";
import { ServiceResponse } from "../types/serviceResponse";

export default class UserService {
  private db = new PrismaClient();

  constructor() {}

  async findAll(): Promise<ServiceResponse<User[]>> {
    try {
      const users = (await this.db.user.findMany()) as User[];
      await this.db.$disconnect();
      return { status: "OK", data: users };
    } catch (error: unknown) {
      return {
        status: "INTERNAL_SERVER_ERROR",
        data: { message: (error as Error).message },
      };
    }
  }

  async findOne(id: number): Promise<ServiceResponse<User>> {
    try {
      const user = (await this.db.user.findUnique({ where: { id } })) as User;
      if (!user) {
        return { status: "CONFLICT", data: { message: "Usuário não encontrado" } };
      }
      await this.db.$disconnect();
      return { status: "OK", data: user };
    } catch (error: unknown) {
      return {
        status: "INTERNAL_SERVER_ERROR",
        data: { message: (error as Error).message },
      };
    }
  }

  async create(user: User): Promise<ServiceResponse<User>> {
    try {
      const { email, cpf } = user;
      const userInDb = await this.db.user.findFirst({
        where: {
          OR: [{ email }, { cpf }],
        },
      });
      if (userInDb) {
        return {
          status: "CONFLICT",
          data: { message: "Usuário já registrado com o e-mail ou CPF" },
        };
      }
      const newUser = (await this.db.user.create({ data: user })) as User;
      await this.db.$disconnect();
      return { status: "CREATED", data: newUser };
    } catch (error: unknown) {
      return {
        status: "INTERNAL_SERVER_ERROR",
        data: { message: (error as Error).message },
      };
    }
  }

  async update(id: number, user: User): Promise<ServiceResponse<User>> {
    try {
      const userInDb = await this.db.user.findUnique({ where: { id } });
      if (!userInDb) {
        return { status: "NOT_FOUND", data: { message: "Usuário não encontrado" } };
      }
      const updatedUser = await this.db.user.update({
        where: { id },
        data: user,
      });
      await this.db.$disconnect();
      return { status: "OK", data: updatedUser as User };
    } catch (error: unknown) {
      return {
        status: "INTERNAL_SERVER_ERROR",
        data: { message: (error as Error).message },
      };
    }
  }
}
