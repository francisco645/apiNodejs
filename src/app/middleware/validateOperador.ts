import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";

export const validateOperador = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.user_id)
    if (!user) {
      return next(new Error('Usuário inválido'))
    }
    if (user.role_id != 2) {
      return next(new Error('Acesso negado'))
    }
    next()
  } catch (error) {
    next(error)
  }
}