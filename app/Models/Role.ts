import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Role extends BaseModel {

  public static readonly MAIN_ADMIN = 'main_admin'
  public static readonly TECH_SUPPORT = 'tech_support'

  @column({ isPrimary: true })
  public id: number

  @column()
  public roles: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
