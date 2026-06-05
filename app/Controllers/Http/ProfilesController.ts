import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import CreateProfileValidator from 'App/Validators/CreateProfileValidator'
import UpdateProfileValidator from 'App/Validators/UpdateProfileValidator'
import DeleteProfileValidator from 'App/Validators/DeleteProfileValidator'

export default class ProfilesController {

  public async show({ auth, response }: HttpContextContract) {
    const user = auth.user!

    const profile = await Profile.findByOrFail('user_id', user.id)

    return response.ok({
      name: profile.name,
      email: user.email,
      gender: profile.gender,
      date_of_birth: profile.dateOfBirth,
    })
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const user = auth.user!

    const existingProfile = await Profile.findBy('user_id', user.id)
    if (existingProfile) {
      return response.conflict({
        message: 'Profile already exists. Use PUT /user/profile to update it.',
      })
    }

    const payload = await request.validate(CreateProfileValidator)

    const profile = await Profile.create({
      userId: user.id,
      name: payload.name,
      mobile: payload.mobile,
      gender: payload.gender,
      dateOfBirth: payload.date_of_birth.toISODate()!,
    })

    return response.created({
      message: 'Profile created successfully',
      profile,
    })
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const user = auth.user!

    const profile = await Profile.findByOrFail('user_id', user.id)

    const payload = await request.validate(UpdateProfileValidator)

    profile.merge({
      name: payload.name,
      mobile: payload.mobile,
      gender: payload.gender,
      dateOfBirth: payload.date_of_birth.toISODate()!,
    })

    await profile.save()

    return response.ok({
      message: 'Profile updated successfully',
      profile,
    })
  }

  public async destroy({ auth, request, response }: HttpContextContract) {
    const user = auth.user!

    const payload = await request.validate(DeleteProfileValidator)

    const profile = await Profile.findByOrFail('user_id', user.id)

    if (profile.mobile !== payload.mobile) {
      return response.badRequest({
        message: 'Mobile number does not match. Account not deleted.',
      })
    }

    await profile.delete()
    await user.delete()

    return response.ok({
      message: 'Account and profile deleted successfully',
    })
  }
}