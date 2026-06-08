import Database from '@ioc:Adonis/Lucid/Database'
import { ValidationRuntimeOptions } from '@ioc:Adonis/Core/Validator'

export async function uniqueMobile(value: unknown, _: unknown, options: ValidationRuntimeOptions) {
  if (typeof value !== 'string') return

  const row = await Database.from('profiles').where('mobile', value).first()
  if (row) {
    options.errorReporter.report(
      options.pointer,
      'uniqueMobile',
      'Mobile number is already in use',
      options.arrayExpressionPointer
    )
  }
}
