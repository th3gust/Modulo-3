import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { GymsSearchUseCase } from '../gyms-search'

export const makeSearchGymsUseCase = () => {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new GymsSearchUseCase(gymsRepository)

  return useCase
}
