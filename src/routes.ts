import express from 'express'
import { userController } from './app/controllers/users/UserController'
import  { middlewareAuth }  from './app/middleware/auth'
import { validateMaster } from './app/middleware/validateMaster'
import { validateOperador } from './app/middleware/validateOperador'
import { validatePrestador } from './app/middleware/validatePrestador'
import { description } from './app/description/description'
import { serviceController } from './app/controllers/services/serviceController'
import { locationController } from './app/controllers/locations/locationController'
import { validateMasterOperador } from './app/middleware/validateMasterOperador'
import { reportController } from './app/controllers/reports/reportController'
import { validateOperadorPrestador } from './app/middleware/validateOperadorPrestador'

const routes = express.Router()

routes.get('/description', <any>description.index)

routes.post('/register', <any>userController.storeMaster)

routes.post('/authenticate', <any>userController.authenticate)

routes.use(<any>middlewareAuth)

routes.put('/users/password', <any>userController.updatePassword)
routes.get('/logout', <any>userController.logout)
routes.get('/refresh', <any>userController.refreshToken)
routes.get('/user', <any>userController.user)

routes.get('/users', [validateMasterOperador, <any>userController.index])
routes.get('/users/:roles_name',[validateMasterOperador, <any>userController.listUser])
routes.put('/users/change/:user_id',[validateMaster, <any>userController.updateUser])
routes.get('/service/:service_id', [validateOperadorPrestador, <any>serviceController.service])

routes.post('/users', [validateMaster,<any>userController.store])
routes.delete('/users/:user_id', [validateMaster, <any>userController.destroy])

routes.post('/services',  [validateOperador, <any>serviceController.store])
routes.put('/services/:service_id', [validateOperador, <any>serviceController.updateUser])
routes.get('/services/organization', [validateOperador, <any>serviceController.listServiceOperador])
routes.get('/services/finalized', [validateOperador, <any>serviceController.listFinalized])
routes.get('/services/active', [validateOperador, <any>serviceController.listActive])
routes.get('/services/canceled', [validateOperador, <any>serviceController.listCanceled])
routes.get('/services/:service_id/report', [validateOperador, <any>reportController.search])
routes.get('/services/locations/:service_id', [validateOperador, <any>locationController.search])
routes.put('/services/:service_id/canceled', [validateOperador, <any>serviceController.serviceCanceled])
routes.get('/services/pending', [validateOperador, <any>serviceController.listPending])
routes.get('/services/search/:type_service', [validateOperador, <any>serviceController.search])

routes.post('/services/:service_id/locations', [validatePrestador, <any>locationController.store])
routes.put('/service/states/:service_id', [validatePrestador, <any>serviceController.updateState])
routes.get('/services/prestador', [validatePrestador, <any>serviceController.listServicePrestador])
routes.post('/report/:service_id', [validatePrestador, <any>reportController.reply])

export { routes }