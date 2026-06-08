import { validator } from '@ioc:Adonis/Core/Validator'
import { uniqueMobile } from 'App/Rules/UniqueMobile'

validator.rule('uniqueMobile', uniqueMobile)
