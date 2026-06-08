import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import User from 'App/Models/User'

export default class extends BaseSchema {
  protected tableName = User.table

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('username')
      table.dropColumn('role_id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('username', 255).notNullable()
      table.integer('role_id')
    })
  }
}