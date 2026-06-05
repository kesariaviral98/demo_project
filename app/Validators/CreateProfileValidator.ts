import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(30),
    ]),
    mobile: schema.string({ trim: true }, [
      rules.regex(/^[0-9]{10}$/),
    ]),
    gender: schema.enum(['MALE', 'FEMALE'] as const),
    date_of_birth: schema.date({ format: 'yyyy-MM-dd' }),
  })

  public messages: CustomMessages = {
    'name.required'          : 'Name is required',
    'name.minLength'         : 'Name must be at least 3 characters',
    'name.maxLength'         : 'Name cannot exceed 30 characters',
    'mobile.required'        : 'Mobile number is required',
    'mobile.regex'           : 'Mobile number must be exactly 10 digits',
    'gender.required'        : 'Gender is required',
    'gender.enum'            : 'Gender must be either MALE or FEMALE',
    'date_of_birth.required' : 'Date of birth is required',
    'date_of_birth.date'     : 'Date of birth must be a valid date in YYYY-MM-DD format',
  }
}
