import { NextFunction, Response, Request } from "express"

class Description {

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let array = [
        {
          method: 'POST',
          path: '/register',
          body: {
            name: 'example',
            email: 'example@mail.com',
            password: 'default',
            cpf: '10443499055',
            nameorganization: 'organization example',
            cnpj: '12345678901234'
          },
          params: {},
          query: {},
          success: {
            organization: 'object'
          },
          error: [400]
        },

        {
          method: 'POST',
          path: '/authenticate',
          body: {
            email: 'example@mail.com',
            password: 'default'
          },
          params: {},
          query: {},
          success: {
            user: 'object',
            token: 'string'
          },
          error: [401, 404, 422]
        },

        {
          method: 'POST',
          path: '/users',
          body: {
            name: 'example',
            email: 'example@mail.com',
            cpf: '10443499055',
            role: 'operador/prestador'
          },
          params: {},
          query: {},
          success: {
            user: 'object',
          },
          error: [400]
        },

        {
          method: 'POST',
          path: '/services',
          body: {
            client: 'Fernanda',
            assignment: 'Manutenção do ar-condionado da marca samsung',
            priority: 'alta',
            type_service: 'manutenção',
            state: 'Rio Grande do Norte',
            city: 'Coronel',
            street: 'Rua Principal',
            district: 'Unico',
            client_number: '54',
            longitude: '-6.262836',
            latitude: '-38.447180'
          },
          params: {},
          query: {},
          success: {
            service: 'object',
          },
          error: [401, 422]
        },

        {
          method: 'POST',
          path: 'services/:service_id/locations',
          body: {
            longitude: '-6.262836',
            latitude: '-38.447180'
          },
          params: {},
          query: {},
          success: {
            locations: 'object',
          },
          error: [401]
        },

        {
          method: 'POST',
          path: '/report/:service_id',
          body: {
            photograps: 'array de fotos',
            input: 'string opcional'
          },
          params: {
            service_id: 'string'
          },
          query: {},
          success: {
            success: 'true'
          },
          error: [400, 401, 404]
        },

        {
          method: 'PUT',
          path: '/users/password',
          body: {
            password: 'novasenha',
            before_password: 'default'
          },
          params: {},
          query: {},
          success: {
            user: 'object',
          },
          error: [404, 401]
        },

        {
          method: 'PUT',
          path: '/users/change/:user_id',
          body: {
            name: 'novonome',
            email: 'novoemail'
          },
          params: {},
          query: {},
          success: {
            user: 'object',
          },
          error: [404, 401]
        },

        {
          method: 'PUT',
          path: '/services/:service_id',
          body: {
            user_id: 'string'
          },
          params: {
            service_id: 'string'
          },
          query: {},
          success: {
            service: 'object',
          },
          error: [404, 401]
        },

        {
          method: 'PUT',
          path: '/services/:service_id/canceled',
          body: {},
          params: {
            service_id: 'string'
          },
          query: {},
          success: {
            service: 'object',
          },
          error: [404, 401]
        },
        
        {
          method: 'PUT',
          path: '/service/states/:service_id',
          body: {
            state: 'em trânsito'
          },
          params: {
            service_id: 'string'
          },
          query: {},
          success: {
            service: 'object',
          },
          error: [401, 404, 422]
        },

        {
          method: 'DELETE',
          path: '/users/:user_id',
          body: {},
          params: {
            user_id: 'string'
          },
          query: {},
          success: {
            success: 'true'
          },
          error: [401, 422]
        },

        {
          method: 'GET',
          path: '/services/organization',
          body: {},
          params: {},
          query: {
            limit: 'number',
            page: 'number'
          },
          success: {
            service: 'array object'
          },
          error: [400]
        },

        {
          method: 'GET',
          path: '/services/prestador',
          body: {},
          params: {},
          query: {
            limit: 'number',
            page: 'number'
          },
          success: {
            service: 'array object'
          },
          error: [400]
        },

        {
          method: 'GET',
          path: '/service/:service_id',
          body: {},
          params: {
            service_id: 'string'
          },
          query: {},
          success: {
            service: 'object'
          },
          error: [400]
        },

        {
          method: 'GET',
          path: '/services/pending',
          body: {},
          params: {},
          query: {
            limit: 'number',
            page: 'number'
          },
          success: {
            service: 'array object'
          },
          error: [401]
        },

        {
          method: 'GET',
          path: '/services/active',
          body: {},
          params: {},
          query: {
            limit: 'number',
            page: 'number'
          },
          success: {
            service: 'object'
          },
          error: [401]
        },

        {
          method: 'GET',
          path: '/services/canceled',
          body: {},
          params: {},
          query: {
            limit: 'number',
            page: 'number'
          },
          success: {
            service: 'array object'
          },
          error: [401]
        },

        {
          method: 'GET',
          path: '/services/finalized',
          body: {},
          params: {},
          query: {
            limit: 'number',
            page: 'number'
          },
          success: {
            service: 'array object'
          },
          error: [401]
        },

        {
          method: 'GET',
          path: '/services/:service_id/report',
          body: {},
          params: {
            service_id: 'string'
          },
          query: {},
          success: {
            report: 'object'
          },
          error: [401]
        },

        {
          method: 'GET',
          path: '/services/search/:type_service',
          body: {},
          params: {
            type_service: 'string'
          },
          query: {},
          success: {
            service: 'array object'
          },
          error: [401, 422]
        },

        {
          method: 'GET',
          path: '/users',
          body: {},
          params: {},
          query: {
            email: 'example@email.com',
            ou: 'uma o outra forma de pesquisa',
            cpf: 'string'

          },
          success: {
            user: 'object'
          },
          error: [400]
        },

        {
          method: 'GET',
          path: '/users/:roles_name',
          body: {},
          params: {
            roles_name: 'operador'
          },
          query: {
            limit: 'number',
            page: 'number'
          },
          success: {
            users: 'array object'
          },
          error: [400]
        },

        {
          method: 'GET',
          path: '/services/locations/:service_id',
          body: {},
          params: {
            service_id: 'string'
          },
          query: {},
          success: {
            locations: 'array object'
          },
          error: [400]
        },

        {
          method: 'GET',
          path: '/refresh',
          body: {},
          params: {},
          query: {},
          success: {
            token: 'string'
          },
          error: [401]
        },

        {
          method: 'GET',
          path: '/logout',
          body: {},
          params: {},
          query: {},
          success: {
            success: 'true'
          },
          error: [401]
        },

        {
          method: 'GET',
          path: '/user',
          body: {},
          params: {},
          query: {},
          success: {
            user: 'object'
          },
          error: [401]
        },
      ]

      res.send(array)

      next()
    } catch (error) {
      next(error)
    }
  }
}

export const description = new Description()