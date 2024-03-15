import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { GymsSearchUseCase } from './gyms-search'

let gymsRepository: InMemoryGymsRepository
let sut: GymsSearchUseCase

describe('Gyms Search Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GymsSearchUseCase(gymsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'Teste 0X',
      description: '',
      phone: '',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Teste 0Y',
      description: null,
      phone: null,
      latitude: -27.2092051,
      longitude: -49.6401091,
    })

    const { gyms } = await sut.execute({
      query: 'Teste 0X',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Teste 0X' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Teste Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092051,
        longitude: -49.6401091,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Teste',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Teste Gym 21' }),
      expect.objectContaining({ title: 'Teste Gym 22' }),
    ])
  })
})
