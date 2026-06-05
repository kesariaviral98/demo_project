import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Remove old columns
      table.dropColumn('first_name')
      table.dropColumn('last_name')
      table.dropColumn('dob')
      table.dropColumn('role')

      // Add new columns
      table.string('name', 30).notNullable()
      table.string('mobile', 10).notNullable()
      table.enum('gender', ['MALE', 'FEMALE']).notNullable()
      table.date('date_of_birth').notNullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Remove new columns
      table.dropColumn('name')
      table.dropColumn('mobile')
      table.dropColumn('gender')
      table.dropColumn('date_of_birth')

      // Restore old columns
      table.string('first_name', 255).notNullable()
      table.string('last_name', 255).notNullable()
      table.string('dob', 255).notNullable()
      table.string('role', 255).notNullable()
    })
  }
}