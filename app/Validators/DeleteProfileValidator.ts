import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DeleteProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    mobile: schema.string({ trim: true }, [
      rules.regex(/^[0-9]{10}$/),
    ]),
  })

  public messages: CustomMessages = {
    'mobile.required': 'Mobile number is required to delete your account',
    'mobile.regex'   : 'Mobile number must be exactly 10 digits',
  }
}
