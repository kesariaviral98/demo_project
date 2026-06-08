import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Role {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>, allowedRoles: string[]) {
    const user = await auth.authenticate()
    await user.load('role')

    if (!allowedRoles.includes(user.role?.roles)) {
      return response.forbidden({ message: 'Access denied.' })
    }

    await next()
  }
}
