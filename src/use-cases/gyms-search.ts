import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface GymsSearchUseCaseRequest {
  query: string
  page: number
}

interface GymsSearchUseCaseResponse {
  gyms: Gym[]
}

export class GymsSearchUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: GymsSearchUseCaseRequest): Promise<GymsSearchUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
