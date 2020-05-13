import { Request, Response, NextFunction } from "express";
import { Answer } from "../../models/answer";
import uuid = require("uuid");
import { FieldAnswer } from "../../models/fieldAnswer";
import { ItemAnswer } from "../../models/itemAnswer";
import * as admin from 'firebase-admin'
import { Service } from "../../models/Service";

class ReportController {

  public reply = async (req: Request, res: Response, next: NextFunction) => {

    try {

      const input = req.body['input']

      const { service_id } = req.params

      const photograps = (<any>req).files.photograps

      const tam = Object.keys(photograps).length

      if (!photograps || tam == 0) {
        return res.status(404).send({ error: 'Photograps é obrigatório' })
      }

      const service = await Service.findOne({
        where: {
          id: service_id,
          organization_id: req.organization_id,
        }
      })

      if(!service){
        return res.status(404).send({ error: 'Serviço inválido' })
      }

      if(service.state_service_id != 2){
        return res.status(422).send({ error: 'Estado inválido'})
      }

      const answer = await Answer.create({
        id: uuid.v4(),
        service_id: service_id,
        report_id: 1
      })

      if (input != null) {
        const field = await FieldAnswer.create({
          id: uuid.v4(),
          type_id: 1,
          answer_id: answer.id
        })

        await ItemAnswer.create({
          id: uuid.v4(),
          item: input,
          fieldAnswer_id: field.id
        })
      }

      const phots = await FieldAnswer.create({
        id: uuid.v4(),
        type_id: 2,
        answer_id: answer.id
      })

      var bucket = admin.storage().bucket();

      if (photograps.name) {
        var name = photograps.name
        var fileUpload = await bucket.file(name)
        await bucket.upload(photograps.tempFilePath, {
          public: true,
          destination: name,
          metadata: {
            contentType: photograps.mimetype
          }
        }).then(exsts => {
          if (exsts) {
            const arq = exsts[0];
            arq.getMetadata().then(async results => {
              var metadata = results[0]
              var url = metadata.mediaLink
              await ItemAnswer.create({
                id: uuid.v4(),
                item: url,
                fieldAnswer_id: phots.id
              })
            })

          }
        })
      } else {
        for (var i = 0; i < tam; i++) {
          var name = photograps[i].name
          var fileUpload = await bucket.file(name)
          await bucket.upload(photograps[i].tempFilePath, {
            public: true,
            destination: name,
            metadata: {
              contentType: photograps[i].mimetype
            }
          }).then(exsts => {
            if (exsts) {
              const arq = exsts[0];
              arq.getMetadata().then(async results => {
                var metadata = results[0]
                var url = metadata.mediaLink
                await ItemAnswer.create({
                  id: uuid.v4(),
                  item: url,
                  fieldAnswer_id: phots.id
                })
              })

            }
          })
        }

      }

      res.send({ sucess: true })

    } catch (error) {
      return next(error)
    }
  }

  public search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const reports = await ItemAnswer.findAll({
        include: [
          {
            model: FieldAnswer,
            as: 'fieldAnswer',
            required: true,
            include: [
              {
              model: Answer,
              as: 'answer',
              required: true,
              where:{
                service_id: req.params.service_id
              }
            }
             
            ]
          },

        ]
      })

      res.send(reports)

    } catch (error) {
      return next(error)
    }
  }

}

export const reportController = new ReportController()