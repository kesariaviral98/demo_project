import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, beforeCreate, BaseModel, hasMany, HasMany, hasOne, HasOne, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { validator, schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import Profile from './Profile'
import Role from './Role'

export default class User extends BaseModel {

  @column()
  public role_id: number

  @manyToMany(() => Role)
  public role: ManyToMany<typeof Role>

  @hasOne(() => Profile, {
  foreignKey: 'user_id'
  })
  public profile: HasOne<typeof Profile>

  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string;

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  hasOne: any

  @beforeCreate()
  public static async validate(user: User) {
    await validator.validate({
      schema: schema.create({
        email: schema.string({ trim: true }, [
          rules.email(),
          rules.unique({ table: 'users', column: 'email' }),
        ]),
        password: schema.string({}, [
          rules.minLength(8),
          rules.maxLength(16),
          rules.alphaNum(),
        ]),
      }),
      messages: {
        'email.required'     : 'Email address is required',
        'email.email'        : 'Please provide a valid email address',
        'email.unique'       : 'This email is already registered',
        'password.required'  : 'Password is required',
        'password.minLength' : 'Password must be at least 8 characters',
        'password.maxLength' : 'Password cannot exceed 16 characters',
        'password.alphaNum'  : 'Password can only contain letters and numbers',
      } as CustomMessages,
      data: {
        email: user.email,
        password: user.password,
      },
    })
  }

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
