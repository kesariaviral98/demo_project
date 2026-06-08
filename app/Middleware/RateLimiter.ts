import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RateLimiterMemory } from 'rate-limiter-flexible'

const limiter = new RateLimiterMemory({
  points: 6,
  duration: 600,
  blockDuration: 600,
})

export default class RateLimiter {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      await limiter.consume(request.ip())
      await next()
    } catch {
      return response.tooManyRequests({
        message: 'Too many requests. Please try again after 10 minutes.',
      })
    }
  }
}
