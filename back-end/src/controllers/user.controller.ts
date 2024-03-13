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
}