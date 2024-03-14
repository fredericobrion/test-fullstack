import { Request, Response } from "express";
import UserService from "../services/user.service";
import mapStatusHTTP from "../utils/mapStatusHTTP";

export default class UserController {
  private userService = new UserService();

  constructor() {}

  async findAll(req: Request, res: Response) {
    const users = await this.userService.findAll();
    res.status(mapStatusHTTP(users.status)).json(users.data);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.findOne(Number(id));
    res.status(mapStatusHTTP(user.status)).json(user.data);
  }

  async create(req: Request, res: Response) {
    const user = req.body;
    const newUser = await this.userService.create(user);
    res.status(mapStatusHTTP(newUser.status)).json(newUser.data);
  }
}