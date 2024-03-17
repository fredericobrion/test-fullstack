import { User } from "../classes/User";
import { ServiceResponse } from "../types/serviceResponse";

export default interface IUserService {
  findAll(): Promise<ServiceResponse<User[]>>;
  findOne(id: number): Promise<ServiceResponse<User>>;
  create(user: User): Promise<ServiceResponse<User>>;
  update(id: number, user: User): Promise<ServiceResponse<User>>;
}