import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'team_user'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['user_id', 'team_id'])
      table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('team_id').notNullable().references('id').inTable('teams').onDelete('CASCADE')
      table.string('role').notNullable().defaultTo('user')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
