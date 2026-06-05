import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import { BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Profile extends BaseModel {

  @column({ isPrimary: true })
  public id!: number

  @column()
  public userId!: number

  @column()
  public name!: string

  @column()
  public mobile!: string

  @column()
  public gender!: 'MALE' | 'FEMALE'

  @column()
  public dateOfBirth!: string

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>
}