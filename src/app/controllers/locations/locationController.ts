import { Request, Response, NextFunction } from "express"
import { validation } from "../validation"
import { Location } from "../../models/location"
import uuid = require("uuid")
import * as admin from 'firebase-admin'
import { Service } from "../../models/Service"
import { TypeService } from "../../models/typeService"
class LocationController {

  public store = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const fields = ['longitude', 'latitude']

      validation.valida(req.body, fields)

      const { longitude, latitude } = req.body

      const service_id = req.params.service_id

      const service = await Service.findOne({
        where: {
          id: service_id,
          user_id: req.user_id,
        }
      })

      if (!service) {
        return res.status(422).send({
          success: false,
          data: {
            field: 'id',
            message: 'Serviço inexistente'
          }
        })
      }

      if (service.state_service_id == 3 || service.state_service_id == 4 || service.state_service_id == null) {
        res.status(404).send({ error: 'estado inválido' })
      }

      const type = await TypeService.findOne({
        where: {
          id: service.state_service_id
        }
      })

      if(!type){
        return res.status(422).send({
          success: false,
          data: {
            field: 'type_service',
            message: 'type_service inválido'
          }
        })
      }
    
      const location = await Location.create({
        id: uuid.v4(),
        longitude: longitude,
        latitude: latitude,
        service_id: service_id
      })

      const db = admin.firestore()

      const refLocation = `${100000000000000 - new Date(location.created_at).getTime()}_${location.id}`

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
        state_service: type.name
      })

      await db.collection('services').doc(service_id).collection('locations').doc(refLocation).set({
        id: location.id,
        latitude: latitude,
        longitude: longitude,
        ref: refLocation
      })

      res.send(location)

    } catch (error) {
      return next(error)
    }
  }

  public search = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const service_id = req.params.service_id

      const locations = await Location.findAll({
        include: [
          {
            model: Service,
            as: 'service',
            required: true,
            where: {
              id: service_id,
              state_service_id: 3
            },
          }
        ],
        order: [
          ['created_at', 'ASC']
        ]
      })

      res.send(locations)

    } catch (error) {
      return next(error)
    }
  }

}

export const locationController = new LocationController()