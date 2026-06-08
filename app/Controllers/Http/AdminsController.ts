import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import User from 'App/Models/User'

export default class AdminsController {

  public async index({ response }: HttpContextContract) {
    const users = await User.query()
      .whereNull('deleted_at')
      .select('id', 'email', 'created_at')

    return response.ok({ users })
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .preload('profile')
      .preload('role')
      .firstOrFail()

    return response.ok({ user })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const user = await User.query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .firstOrFail()

    user.merge(request.only(['email']))
    await user.save()

    return response.ok({ message: 'User updated successfully', user })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const user = await User.query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .firstOrFail()

    user.deletedAt = DateTime.now()
    await user.save()

    return response.ok({ message: 'User deleted successfully' })
  }
}
