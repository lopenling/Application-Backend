import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table //
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('cascade')

      table.text('token').notNullable()
      table.string('type').notNullable()

      table.timestamp('created_at')
      table.timestamp('expires_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
