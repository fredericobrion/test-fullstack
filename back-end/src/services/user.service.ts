import { User } from "../classes/User";
import IUserService from "../interfaces/IUSerService";
import IUserModel from "../interfaces/IUserModel";
import PrismaUserModel from "../models/UserModel";
import { ServiceResponse } from "../types/serviceResponse";

export default class UserService implements IUserService {
  constructor(private db: IUserModel = new PrismaUserModel()) {}

  async findAll(): Promise<ServiceResponse<User[]>> {
    try {
      const users = await this.db.getUsers();
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
      const user = await this.db.getUserById(id);
      if (!user) {
        return {
          status: "NOT_FOUND",
          data: { message: "Usuário não encontrado" },
        };
      }
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
      const userWithSameEmail = await this.db.findUserByEmail(email);
      const userWithSameCpf = await this.db.finduserByCpf(cpf);
      if (userWithSameCpf || userWithSameEmail) {
        return {
          status: "CONFLICT",
          data: { message: "Usuário já registrado com o e-mail ou CPF" },
        };
      }
      const newUser = await this.db.createUser(user);
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
      const userInDb = await this.db.getUserById(id);
      if (!userInDb) {
        return {
          status: "NOT_FOUND",
          data: { message: "Usuário não encontrado" },
        };
      }
      const { email, cpf } = user;
      const userWithSameEmail = await this.db.findUserByEmail(email);
      const userWithSameCpf = await this.db.finduserByCpf(cpf);
      if (
        (userWithSameEmail && userWithSameEmail?.id !== id) ||
        (userWithSameCpf && userWithSameCpf?.id !== id)
      ) {
        return {
          status: "CONFLICT",
          data: { message: "Usuário já registrado com o e-mail ou CPF" },
        };
      }
      const updatedUser = await this.db.updateUser(id, user);
      return { status: "OK", data: updatedUser as User };
    } catch (error: unknown) {
      return {
        status: "INTERNAL_SERVER_ERROR",
        data: { message: (error as Error).message },
      };
    }
  }
}
