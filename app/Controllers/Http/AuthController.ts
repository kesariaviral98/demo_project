import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {

  public async register({ request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.create({ email, password })

    return response.created({
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
      },
    })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)

    try {
      const token = await auth.use('api').attempt(payload.email, payload.password)
      return response.ok({
        message: 'Logged in successfully',
        token: token.toJSON(),
      })
    } catch {
      return response.unauthorized({
        message: 'Invalid email or password',
      })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return response.ok({
      message: 'Logged out successfully',
    })
  }

}