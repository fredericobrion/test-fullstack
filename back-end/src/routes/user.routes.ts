import { Request, Response, Router } from 'express';
import UserController from '../controllers/user.controller';

const userController = new UserController();

const router = Router();

router.get('/', (req: Request, res: Response) => userController.findAll(req, res));

export default router;
