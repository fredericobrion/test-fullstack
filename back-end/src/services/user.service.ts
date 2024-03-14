import { PrismaClient } from '@prisma/client';
import { User } from '../classes/User'
import { ServiceResponse } from '../types/serviceResponse';

export default class UserService  {
  private db = new PrismaClient();

  constructor() {
  }

  async findAll(): Promise<ServiceResponse<User[]>> {
    const users = await this.db.user.findMany() as User[];
    await this.db.$disconnect();
    return { status: 'OK', data: users };
  }

  async findOne(id: number): Promise<ServiceResponse<User>> {
    const user = await this.db.user.findUnique({ where: { id } }) as User;
    await this.db.$disconnect();
    return { status: 'OK', data: user };
  }

  async create(user: User): Promise<ServiceResponse<User>> {
    const newUser = await this.db.user.create({ data: user }) as User;
    await this.db.$disconnect();
    return { status: 'OK', data: newUser };
  }

  async update(id: number, user: User): Promise<ServiceResponse<User>> {
    const updatedUser = await this.db.user.update({ where: { id }, data: user }) as User;
    await this.db.$disconnect();
    return { status: 'OK', data: updatedUser };
  }
}
