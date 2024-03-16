import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'
import { nearby } from './nearby'
import { verifyUserRoles } from '@/http/middlewares/verify-user-roles'

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/create', { onRequest: verifyUserRoles('ADMIN') }, create)
  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
