import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { environment } from '../../config/environment'
import { isObject } from "util";
import { User } from "../models/user";
import { InvalidToken } from '../models/invalidToken';
import { Role } from "../models/role";
import { Organization } from "../models/organization";

export const middlewareAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).send({ error: "Token não informado" })
  }

  const parts = authHeader.split(' ')

  if (!(parts.length === 2)) {
    return res.status(401).send({ error: "Token errado" })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token error" })
  }

  const invalidToken = await InvalidToken.findOne({
    where:{
      token: token
    }
  })

  if(invalidToken != null){
    return res.status(401).send({ error: "Token inválido" })
  }

  jwt.verify(token, environment.jwtSecret, (error, decoded: any) => {
    
    if (error) {
      return res.status(401).send({ error: "Token inválido" })
    }
    if (!decoded) {
      return res.status(401).send({ error: "Token err" })
    }

    if (isObject(decoded)) {
      req.user_id = decoded.id
    } else {
      req.user_id = decoded
    }

  })

  const user = await User.findOne({
    where: {
      id: req.user_id
    }
  })
  if(!user){
    return res.status(401).send({ error: "Usuário inválido" })
  }

  req.role_id = user.role_id
  req.organization_id = user.organization_id

  return next()

}
