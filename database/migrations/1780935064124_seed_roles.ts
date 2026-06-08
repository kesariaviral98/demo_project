import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Role from 'App/Models/Role'

export default class extends BaseSchema {

  public async up() {
    await this.db.table(Role.table).multiInsert([
      { roles: Role.MAIN_ADMIN },
      { roles: Role.TECH_SUPPORT },
    ])
  }

  public async down() {
    await this.db.table(Role.table)
      .whereIn('roles', [Role.MAIN_ADMIN, Role.TECH_SUPPORT])
      .delete()
  }
}
