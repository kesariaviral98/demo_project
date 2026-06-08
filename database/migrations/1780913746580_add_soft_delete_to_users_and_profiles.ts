import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import User from 'App/Models/User'
import Profile from 'App/Models/Profile'

export default class extends BaseSchema {

  public async up() {
    this.schema.alterTable(User.table, (table) => {
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })

    this.schema.alterTable(Profile.table, (table) => {
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.alterTable(User.table, (table) => {
      table.dropColumn('deleted_at')
    })

    this.schema.alterTable(Profile.table, (table) => {
      table.dropColumn('deleted_at')
    })
  }
}
