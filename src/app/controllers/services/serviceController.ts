import { Request, Response, NextFunction } from "express"
import { validation } from "../validation"
import { Service } from "../../models/Service"
import uuid = require("uuid")
import { TypeService } from "../../models/typeService"
import { User } from "../../models/user"
import { StateService } from "../../models/stateService"
import { Op } from "sequelize"
import * as admin from 'firebase-admin'

class ServiceController {

  public store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const fields = ['client', 'assignment', 'priority', 'type_service', 'state', 'city', 'street', 'district', 'client_number', 'longitude', 'latitude']

      validation.valida(req.body, fields)

      const { client, assignment, priority, type_service, state, city, street, district, client_number, longitude, latitude } = req.body

      const t = await TypeService.findOne({
        where: {
          name: type_service
        }
      })
      
      if(!t){
        return res.status(422).send({
          success: false,
          data: {
            field: 'type_service',
            message: 'type_service inválido'
          }
        })
      }

      const service = await Service.create({
        id: uuid.v4(),
        client: client,
        assignment: assignment,
        priority: priority,
        state: state,
        city: city,
        street: street,
        district: district,
        client_number: client_number,
        type_service_id: t.id,
        organization_id: req.organization_id,
        latitude: latitude,
        longitude: longitude
      })

      const db = admin.firestore()

      await db.collection('services').doc(service.id).set({
        id: service.id,
        client: client,
        assignment: assignment,
        priority: priority,
        state: state,
        city: city,
        street: street,
        district: district,
        client_number: client_number,
        type_service_id: t.id,
        organization_id: req.organization_id,
        latitude: latitude,
        longitude: longitude,
        state_service: ""
      })

      res.send(service)

    } catch (error) {

      return next(error)

    }
  }

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let fields = ['user_id']

      validation.valida(req.body, fields)

      fields = ['service_id']

      validation.valida(req.params, fields)

      const { user_id } = req.body

      const { service_id } = req.params

      const service = await Service.findOne({
        where: {
          id: service_id,
          organization_id: req.organization_id,
        }
      })

      if(!service){
        return res.status(404).send({ error: "serviço não existe" })
      }

      if(service.state_service_id == 1 || service.state_service_id == 2 || service.state_service_id == 3){
        return res.status(422).send({ error: "Usuário não pode ser alterado"})
      }

      const user = await User.findOne({
        where: {
          id: user_id,
          role_id: 3,
          organization_id: req.organization_id
        }
      })

      if(!user){
        return res.status(404).send({ error: "usuário inválido" })
      }

      await service.update({
        user_id: user_id
      })

      res.send(service)

    } catch (error) {
      return next(error)
    }
  }

  public updateState = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let fields = ['state']

      validation.valida(req.body, fields)

      fields = ['service_id']

      validation.valida(req.params, fields)

      const { state } = req.body

      const { service_id } = req.params

      const service = await Service.findOne({
        where: {
          id: service_id,
          organization_id: req.organization_id
        }
      })

      if(!service){
        return res.status(404).send({ error: "serviço não existe" })
      }

      if(service.user_id != req.user_id) { 
        return res.status(404).send({ error: "usuário inválido" })
      }

      const s = await StateService.findOne({
        where: {
          name: state
        }
      })

      if (!s) {
        return res.status(422).send({
          success: false,
          data: {
            field: 'state',
            message: 'estado inválido'
          }
        })
      }

      if(service.state_service_id == null && (s.id == 2 || s.id == 3)) {
        return res.status(404).send({ error: "estado inválido" })

      }else if(service.state_service_id == 1 && (s.id == 3 || s.id == 1)) {
        return res.status(404).send({ error: "estado inválido" })

      }else if(service.state_service_id == 2 && (s.id == 1 || s.id == 2)) {
        return res.status(404).send({ error: "estado inválido" })

      }else if(service.state_service_id == 3 || service.state_service_id == 4 ) {
        return res.status(404).send({ error: "estado não pode ser alterado" })
      }

      const services = await Service.findAll({
        where: {
          user_id: req.user_id
        }
      })

      let serv_inv = false
      await services.forEach(svc => {
        if(svc.id != service.id && (svc.state_service_id == 1 || svc.state_service_id == 2)){
          serv_inv = true
        }
      });

      if(serv_inv){
        return res.status(404).send({ error: 'um serviço já se encontra em execução' })
      }

      await service.update({
        state_service_id: s.id
      })

      const db = admin.firestore()

      await db.collection('services').doc(service_id).set({
        id: service_id,
        client: service.client,
        assignment: service.assignment,
        priority: service.priority,
        state: service.state,
        city: service.city,
        street: service.street,
        district: service.district,
        client_number: service.client_number,
        type_service_id: service.type_service_id,
        organization_id: req.organization_id,
        latitude: service.latitude,
        longitude: service.longitude,
        state_service: state
      })

      let serv
      
      if(s.id == 4){

        await service.update({
          user_id: null
        })

        serv = null

      }else{

      serv = await Service.findOne({
        where: {
          id: service_id,
          organization_id: req.organization_id
        },
        include: [
          {
            model: StateService,
            as: 'stateService',
            required: false
          },
          {
            model: TypeService,
            as: 'typeService',
            required: true
          },
        ]
      })

    }

      res.send(serv)

    } catch (error) {
      return next(error)
    }
  }

  public listServiceOperador = async (req: Request, res: Response, next: NextFunction) => {

    try {

      let page = req.query.page || undefined
      let limit = req.query.limit || undefined
      let offset = undefined

      if(page && limit) {
        offset = Number(page) === 1 ? (Number(page) - 1) * Number(limit) : (Number(page) - 1) * Number(limit) + 1
      }

      const services = await Service.findAll({
        limit,
        offset,
        where: {
          organization_id: {
            [Op.eq]: req.organization_id
          },
        },
        include: [
          {
            model: StateService,
            as: 'stateService',
            required: false
          },
          {
            model: TypeService,
            as: 'typeService',
            required: true
          },
        ],
        order: [
          ['updated_at', 'DESC']
        ]
      })
  
      if (!services) {
        return res.status(422).send({
          success: false,
          data: {
            field: 'id',
            message: 'Usuário inválido'
          }
        })
      }
  
      res.send(services)

    } catch (error) {
       return next(error)
    }

  }

  public listServicePrestador = async (req: Request, res: Response, next: NextFunction) => {

    try {

      let page = req.query.page || undefined
      let limit = req.query.limit || undefined
      let offset = undefined

      if(page && limit) {
        offset = Number(page) === 1 ? (Number(page) - 1) * Number(limit) : (Number(page) - 1) * Number(limit) + 1
      }

      const services = await Service.findAll({
        limit, 
        offset,
        where: {
          user_id: {
            [Op.eq]: req.user_id
          }
        },
        include: [
          {
            model: StateService,
            as: 'stateService',
            required: false
          },
          {
            model: TypeService,
            as: 'typeService',
            required: true
          },
        ],
        order: [
          ['updated_at', 'DESC']
        ]
      })
  
      if (!services) {
        return res.status(422).send({
          success: false,
          data: {
            field: 'id',
            message: 'Usuário inválido'
          }
        })
      }
  
      res.send(services)

    } catch (error) {
       return next(error)
    }

  }

  public service = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const service = await Service.findOne({
        where: {
          id: req.params.service_id,
          organization_id: req.organization_id
        },
        include: [
          {
            model: StateService,
            as: 'stateService',
            required: false
          },
          {
            model: TypeService,
            as: 'typeService',
            required: true
          },
        ]
      })

      if(!service){
        return res.status(404).send({ error: "serviço não existe" })
      }


      res.send(service)
      
    } catch (error) {
      return next(error)
    }
  }

  public listFinalized = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let page = req.query.page || undefined
      let limit = req.query.limit || undefined
      let offset = undefined

      if(page && limit) {
        offset = Number(page) === 1 ? (Number(page) - 1) * Number(limit) : (Number(page) - 1) * Number(limit) + 1
      }

      const services = await Service.findAll({
        limit,
        offset,
        where: {
          organization_id: req.organization_id,
          state_service_id: 3
        },
        include: [
          {
            model: StateService,
            as: 'stateService',
            required: false
          },
          {
            model: TypeService,
            as: 'typeService',
            required: true
          },
          {
            model: User,
            as: 'user',
            required: false
          }
        ],
        order: [
          ['updated_at', 'DESC']
        ]
      })

      res.send(services)
      
    } catch (error) {
      return next(error)
    }
  }

  public listCanceled = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let page = req.query.page || undefined
      let limit = req.query.limit || undefined
      let offset = undefined

      if(page && limit) {
        offset = Number(page) === 1 ? (Number(page) - 1) * Number(limit) : (Number(page) - 1) * Number(limit) + 1
      }

      const services = await Service.findAll({
        limit,
        offset,
        where: {
          organization_id: req.organization_id,
          state_service_id:4
        },
        include: [
          {
            model: StateService,
            as: 'stateService',
            required: false
          },
          {
            model: TypeService,
            as: 'typeService',
            required: true
          },
        ],
        order: [
          ['updated_at', 'DESC']
        ]
      })

      res.send(services)
      
    } catch (error) {
      return next(error)
    }
  }

  public listActive = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let page = req.query.page || undefined
      let limit = req.query.limit || undefined
      let offset = undefined

      if(page && limit) {
        offset = Number(page) === 1 ? (Number(page) - 1) * Number(limit) : (Number(page) - 1) * Number(limit) + 1
      }

      const services = await Service.findAll({
        limit, 
        offset,
        where: {
          organization_id: {
            [Op.eq]: req.organization_id
          },
          [Op.or]: [{state_service_id: 1}, {state_service_id: 2}]  
        },
        include: [
          {
            model: StateService,
            as: 'stateService',
            required: false
          },
          {
            model: TypeService,
            as: 'typeService',
            required: true
          },
          {
            model: User,
            as: 'user',
            required: false
          }
        ],
        order: [
          ['updated_at', 'DESC']
        ]
      })

      res.send(services)
      
    } catch (error) {
      return next(error)
    }
  }

  public listPending = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let page = req.query.page || undefined
      let limit = req.query.limit || undefined
      let offset = undefined

      if(page && limit) {
        offset = Number(page) === 1 ? (Number(page) - 1) * Number(limit) : (Number(page) - 1) * Number(limit) + 1
      }

      const services = await Service.findAll({
        limit,
        offset,
        where: {
          organization_id: {
            [Op.eq]: req.organization_id
          },
          state_service_id: {
            [Op.eq]: null
          }
        },
        include: [
          {
            model: TypeService,
            as: 'typeService',
            required: true
          },
          {
            model: User,
            as: 'user',
            required: false
          }
        ],
        order: [
          ['updated_at', 'DESC']
        ]
      })

      res.send(services)
      
    } catch (error) {
      return next(error)
    }
  }

  public serviceCanceled = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const service = await Service.findOne({
        where: {
          id: req.params.service_id,
          organization_id: req.organization_id
        }
      })

      if(!service){
        return res.status(404).send({ error: "serviço não existe" })
      }

      if(service.state_service_id == 3 || service.state_service_id == 4){
        return res.status(404).send({ error: "estado inválido" })
      }

      await service.update({
        state_service_id: 4,
        user_id: null
      })

      const serv = await Service.findOne({
        where: {
          id: req.params.service_id,
          organization_id: req.organization_id
        },
        include: [
          {
            model: StateService,
            as: 'stateService',
            required: false
          },
          {
            model: TypeService,
            as: 'typeService',
            required: true
          },
        ],
        order: [
          ['updated_at', 'DESC']
        ]
      })

      res.send(serv)

    } catch (error) {
      return next(error)
    }
  }

  public search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const type = await TypeService.findOne({
        where: {
          name: req.params.type_service
        }
      })

      if(!type) {
        return res.status(404).send({ error: 'tipo inexistente' })
      }

      const services = await Service.findAll({
        where: {
          type_service_id: type.id,
          organization_id: req.organization_id
        },
        include: [
          {
            model: StateService,
            as: 'stateService',
            required: false
          },
          {
            model: TypeService,
            as: 'typeService',
            required: true
          },
          {
            model: User,
            as: 'user',
            required: false
          }
        ],
        order: [
          ['updated_at', 'DESC']
        ]
      })

      res.send( services )

    } catch (error) {
      return next(error)
    }
  }

}

export const serviceController = new ServiceController()