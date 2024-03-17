import { Request, Response } from "express";
import UserService from "../services/user.service";
import mapStatusHTTP from "../utils/mapStatusHTTP";
import IUserService from "../interfaces/IUSerService";

export default class UserController {
  constructor(private service: IUserService = new UserService()) {}

  async findAll(req: Request, res: Response) {
    const users = await this.service.findAll();
    res.status(mapStatusHTTP(users.status)).json(users.data);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.service.findOne(Number(id));
    res.status(mapStatusHTTP(user.status)).json(user.data);
  }

  async create(req: Request, res: Response) {
    const user = req.body;
    const newUser = await this.service.create(user);
    res.status(mapStatusHTTP(newUser.status)).json(newUser.data);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.body;
    const updatedUser = await this.service.update(Number(id), user);
    res.status(mapStatusHTTP(updatedUser.status)).json(updatedUser.data);
  }
}