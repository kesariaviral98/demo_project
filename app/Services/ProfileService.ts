import { DateTime } from 'luxon'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'

export default class ProfileService {

  public async getProfile(userId: number) {
    return Profile.query().where('user_id', userId).whereNull('deleted_at').firstOrFail()
  }

  public async profileExists(userId: number) {
    const profile = await Profile.query().where('user_id', userId).whereNull('deleted_at').first()
    return !!profile
  }

  public async createProfile(userId: number, data: {
    name: string
    mobile: string
    gender: 'MALE' | 'FEMALE'
    dateOfBirth: string
  }) {
    return Profile.create({ userId, ...data })
  }

  public async updateProfile(userId: number, data: {
    name: string
    mobile: string
    gender: 'MALE' | 'FEMALE'
    dateOfBirth: string
  }) {
    const profile = await this.getProfile(userId)
    profile.merge(data)
    await profile.save()
    return profile
  }

  public async deleteProfile(userId: number, mobile: string, user: User) {
    const profile = await this.getProfile(userId)

    if (profile.mobile !== mobile) {
      return false
    }

    profile.deletedAt = DateTime.now()
    await profile.save()

    user.deletedAt = DateTime.now()
    await user.save()

    return true
  }
}
