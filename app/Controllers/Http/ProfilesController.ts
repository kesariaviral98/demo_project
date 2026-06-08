import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateProfileValidator from 'App/Validators/CreateProfileValidator'
import UpdateProfileValidator from 'App/Validators/UpdateProfileValidator'
import DeleteProfileValidator from 'App/Validators/DeleteProfileValidator'
import ProfileService from 'App/Services/ProfileService'

const profileService = new ProfileService()

export default class ProfilesController {

  public async show({ auth, response }: HttpContextContract) {
    const user = auth.user!
    const profile = await profileService.getProfile(user.id)

    return response.ok({
      name: profile.name,
      email: user.email,
      gender: profile.gender,
      date_of_birth: profile.dateOfBirth,
    })
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const user = auth.user!

    if (await profileService.profileExists(user.id)) {
      return response.conflict({
        message: 'Profile already exists. Use PUT /user/profile to update it.',
      })
    }

    const payload = await request.validate(CreateProfileValidator)

    const profile = await profileService.createProfile(user.id, {
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
    const payload = await request.validate(UpdateProfileValidator)

    const profile = await profileService.updateProfile(user.id, {
      name: payload.name,
      mobile: payload.mobile,
      gender: payload.gender,
      dateOfBirth: payload.date_of_birth.toISODate()!,
    })

    return response.ok({
      message: 'Profile updated successfully',
      profile,
    })
  }

  public async destroy({ auth, request, response }: HttpContextContract) {
    const user = auth.user!
    const payload = await request.validate(DeleteProfileValidator)

    const deleted = await profileService.deleteProfile(user.id, payload.mobile, user)

    if (!deleted) {
      return response.badRequest({
        message: 'Mobile number does not match. Account not deleted.',
      })
    }

    return response.ok({
      message: 'Account and profile deleted successfully',
    })
  }
}
