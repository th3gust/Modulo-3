import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileCase } from '../get-user-profile'

export const makeGetUserProfileUseCase = () => {
  const userRepository = new PrismaUserRepository()
  const useCase = new GetUserProfileCase(userRepository)

  return useCase
}
