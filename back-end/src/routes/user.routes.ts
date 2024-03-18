import { Request, Response, Router } from "express";
import UserController from "../controllers/user.controller";
import ValidateUser from "../utils/validateUser";

const userController = new UserController();

const router = Router();

router.get("/", (req: Request, res: Response) =>
  userController.findAll(req, res)
);
router.get("/:id", (req: Request, res: Response) =>
  userController.findOne(req, res)
);
router.post(
  "/",
  ValidateUser.validateUserValues,
  (req: Request, res: Response) => userController.create(req, res)
);
router.put(
  "/:id",
  ValidateUser.validateUserValues,
  (req: Request, res: Response) => userController.update(req, res)
);

export default router;
