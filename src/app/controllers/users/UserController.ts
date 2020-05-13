import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import uuid = require("uuid");
import jwt from 'jsonwebtoken'
import { environment } from '../../../config/environment'
import Bcryptjs from 'bcryptjs'
import { validation } from '../validation'
import { Role } from "../../models/role";
import { Op } from "sequelize";
import { Organization } from "../../models/organization";
import { InvalidToken } from '../../models/invalidToken';

class UserController {

  private generateToken = (params: any) => {
    return jwt.sign(params, environment.jwtSecret, {
      expiresIn: 86400,
    })
  }

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, cpf } = req.query

      if (!email && !cpf) {
        return res.status(400).send({ error: 'informar dados de busca' })
      }

      let user_pro

      if (req.role_id == 1 && email) {
        user_pro = await User.findOne({
          where: {
            email: email,
            organization_id: req.organization_id
          },
          include: [
            {
              model: Role,
              as: 'role',
              required: true
            }
          ]
        })
      } else if (req.role_id == 1 && cpf) {
        user_pro = await User.findOne({
          where: {
            cpf: cpf,
            organization_id: req.organization_id
          },
          include: [
            {
              model: Role,
              as: 'role',
              required: true
            }
          ]
        })
      } else if (req.role_id == 2 && email) {
        user_pro = await User.findOne({
          where: {
            email: email,
            organization_id: req.organization_id,
            role_id: 3
          },
          include: [
            {
              model: Role,
              as: 'role',
              required: true
            }
          ]
        })
      } else if (req.role_id == 2 && cpf) {
        user_pro = await User.findOne({
          where: {
            cpf: cpf,
            organization_id: req.organization_id,
            role_id: 3
          },
          include: [
            {
              model: Role,
              as: 'role',
              required: true
            }
          ]
        })
      }

      res.send(user_pro)

    } catch (error) {
      return next(error)
    }
  }

  public user = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const user = await User.findOne({
        where: {
          id: req.user_id
        },
        include: [
          {
            model: Role,
            as: 'role',
            required: true
          }
        ]
      })

      res.send(user)
      
    } catch (error) {
      return next(error)
    }
  }

  public listUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const fields = ['roles_name']

      validation.valida(req.params, fields)

      const rName = req.params.roles_name

      const r = await Role.findOne({
        where: {
          name: {
            [Op.not]: 'master',
            [Op.eq]: rName
          }
        }
      })

      if (!r) {
        return res.status(422).send({
          success: false,
          data: {
            field: 'role',
            message: 'role inválido'
          }
        })
      }

      if(req.role_id == 2 && rName != 'prestador') {
        return res.status(422).send({
          success: false,
          data: {
            field: 'role',
            message: 'acesso negado'
          }
        })
      }

      let page = req.query.page || undefined
      let limit = req.query.limit || undefined
      let offset = undefined

      if(page && limit) {
        offset = Number(page) === 1 ? (Number(page) - 1) * Number(limit) : (Number(page) - 1) * Number(limit) + 1
      }

      const users = await User.findAll({
        limit,
        offset,
        where: {
          organization_id: {
            [Op.eq]: req.organization_id
          },
          role_id: {
            [Op.eq]: r.id
          }
        }
      })
      res.send(users)

    } catch (error) {
      return next(error)
    }
  }

  public storeMaster = async (req: Request, res: Response, next: NextFunction) => {

    try {

      const fields = ['name', 'email', 'password', 'cpf', 'nameorganization', 'cnpj']

      validation.valida(req.body, fields)

      const { name, email, cpf, nameorganization, cnpj, password } = req.body

      const organization = await Organization.create({
        id: uuid.v4(),
        name: nameorganization,
        cnpj: cnpj
      })

      const hash = await Bcryptjs.hashSync(password, environment.hash_salt)

      const user = await User.create({
        id: uuid.v4(),
        name: name,
        email: email,
        password: hash,
        cpf: cpf,
        is_active: true,
        role_id: 1,
        organization_id: organization.id
      })

      user.password = ""

      res.send({ organization: organization })

    } catch (error) {
      return next(error)
    }
  }

  public store = async (req: Request, res: Response, next: NextFunction) => {

    try {

      const fields = ['name', 'email', 'cpf', 'role']

      validation.valida(req.body, fields)

      const { name, email, cpf, role } = req.body

      const r = await Role.findOne({
        where: {
          name: {
            [Op.not]: 'master',
            [Op.eq]: role
          }
        }
      })

      if (!r) {
        return res.status(422).send({
          success: false,
          data: {
            field: 'role',
            message: 'role inválido'
          }
        })
      }

      const hash = await Bcryptjs.hashSync("default", environment.hash_salt)

      const user = await User.create({
        id: uuid.v4(),
        name: name,
        email: email,
        password: hash,
        cpf: cpf,
        is_active: false,
        role_id: r.id,
        organization_id: req.organization_id
      })

      user.password = ""
      res.send({ user: user })

    } catch (error) {
      return next(error)
    }
  }

  public authenticate = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const fields = ['email', 'password', 'platform']

      validation.valida(req.body, fields)

      const { email, password, platform } = req.body

      const user = await User.findOne(
        {
          attributes: ['id', 'name', 'email', 'password', 'is_active', 'role_id'],
          where: {
            email
          },
          include: [
            {
              model: Role,
              as: 'role',
              required: true
            }
          ]
        })

      if (!user) {
        return res.status(400).send({ error: "Usuário não encontrado" })
      }
      if (platform == "mobile" && user.role_id != 3) {
        return res.status(401).send({ error: "Acesso negado" })
      }
      if (platform == "web" && user.role_id == 3) {
        return res.status(401).send({ error: "Acesso negado" })
      }
      if (!Bcryptjs.compareSync(password, user.password)) {
        return res.status(401).send({ error: "Senha errada" })
      }
      const token = this.generateToken({ id: user.id })
      user.password = ""

      res.send({ user: user, token: token, pre_registration: !user.is_active })

    } catch (error) {
      next(error)
    }

  }

  public updatePassword = async (req: Request, res: Response, next: NextFunction) => {

    try {

      const fields = ['password', 'before_password']

      validation.valida(req.body, fields)

      const { password, before_password } = req.body

      const hash = await Bcryptjs.hashSync(password, environment.hash_salt)

      const user = await User.findOne({
        attributes: ['id', 'name', 'email', 'password', 'is_active', 'role_id'],
        where: {
          id: req.user_id
        }
      })

      if (!user) {
        return res.status(404).send({ error: "usuário não existe" })
      }

      if (!Bcryptjs.compareSync(before_password, user.password)) {
        return res.status(401).send({ error: "Senha errada" })
      }

      await user.update({
        password: hash,
        is_active: true
      })

      user.password = ''

      res.send(user)

    } catch (error) {
      return next(error)
    }
  }

  private liberaTokens = async () => {
    const invt = await InvalidToken.destroy({
      where: {
        data: {
          [Op.lte]: Date.now()
        }
      }
    })
  }

  public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization
      if (!header) {
        return res.status(401).send({ error: "Token não informado" })
      }
      var date = new Date();
      date.setDate(date.getDate() + 1);
      const parts = header.split(' ')
      const [scheme, token] = parts
      await InvalidToken.create({
        id: uuid.v4(),
        token: token,
        data: date
      })
      this.liberaTokens()
      const tokenG = this.generateToken({ id: req.user_id })
      res.send({ token: tokenG })

    } catch (error) {
      return next(error)
    }

  }

  public updateUser = async(req: Request, res: Response, next: NextFunction) => {

    try {

      const fields = ['name', 'email']

      validation.valida(req.body, fields)

      const { name, email} = req.body

      const user = await User.findOne({
        attributes: ['id', 'name', 'email', 'cpf'],
        where: {
          id: req.params.user_id
        }
      })

      if (!user) {
        return res.status(422).send({
          success: false,
          data: {
            field: 'id',
            message: 'Usuário inválido'
          }
        })
      }

      await user.update({
        name: name,
        email: email
      })

      res.send(user)

    } catch (error) {
      return next(error)
    }
  }

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization
      if (!header) {
        return res.status(401).send({ error: "Token não informado" })
      }
      var date = new Date();
      date.setDate(date.getDate() + 1);
      const parts = header.split(' ')
      const [scheme, token] = parts
      const invt = await InvalidToken.create({
        id: uuid.v4(),
        token: token,
        data: date
      })
      this.liberaTokens()
      res.send({ success: true })

    } catch (error) {
      return next(error)
    }

  }

  public destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const users = await User.destroy({
        where: {
          id: {
            [Op.eq]: req.params.user_id
          },
          role_id: {
            [Op.not]: 1
          }
        }
      })

      if (!users) {
        return res.status(422).send({
          success: false,
          data: {
            field: 'id',
            message: 'Usuário inválido'
          }
        })
      }

      res.send({ success: true })

    } catch (error) {
      return next(error)
    }
  }

}

export const userController = new UserController()