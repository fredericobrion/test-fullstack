import { User } from '../classes/User'
import { ServiceResponse } from '../types/serviceResponse';
import UserPrismaDatabase from '../models/UserPrismaDatabase';

export default class UserService  {
  private db = new UserPrismaDatabase;

  constructor() {
  }

  async findAll(): Promise<ServiceResponse<User[]>> {
    await this.db.connect();
    const usersData = await this.db.findAll();
    await this.db.disconnect();
    const users = usersData.map((user: User) => new User(user));
    return { status: 'OK', data: users };
  }
}
