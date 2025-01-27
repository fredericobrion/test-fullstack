import Joi from "joi";
// import { validate } from "cpf-check";
import { Request, Response, NextFunction } from "express";

const createUserSchema = Joi.object({
  id: Joi.number().integer().positive().optional(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  cpf: Joi.string()
    .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{2}\) \d{4}-\d{4}$/)
    .required(),
  status: Joi.string()
    .valid("ACTIVE", "INACTIVE", "PENDING", "DISABLED")
    .optional(),
});

export default class ValidateUser {
  static validateUserValues(req: Request, res: Response, next: NextFunction) {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  }
}
