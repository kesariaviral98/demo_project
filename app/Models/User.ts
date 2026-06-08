import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import { HasOne, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Profile from 'App/Models/Profile'
import Role from 'App/Models/Role'

export default class User extends BaseModel {

  @column({ isPrimary: true })
  public id!: number

  @column()
  public roleId: number | null = null

  @column()
  public email!: string

  @column({ serializeAs: null })
  public password!: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @column.dateTime()
  public deletedAt: DateTime | null = null

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasOne(() => Profile)
  public profile!: HasOne<typeof Profile>

  @belongsTo(() => Role)
  public role!: BelongsTo<typeof Role>
}
