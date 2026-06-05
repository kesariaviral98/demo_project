import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [
      rules.minLength(8),
      rules.maxLength(16),
      rules.alphaNum(),
    ]),
  })

  public messages: CustomMessages = {
    'email.required'     : 'Email address is required',
    'email.email'        : 'Please provide a valid email address',
    'email.unique'       : 'This email is already registered',
    'password.required'  : 'Password is required',
    'password.minLength' : 'Password must be at least 8 characters',
    'password.maxLength' : 'Password cannot exceed 16 characters',
    'password.alphaNum'  : 'Password can only contain letters and numbers',
  }
}
