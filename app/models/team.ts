import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Team extends BaseModel {
  /**
   * Serialize role from pivot table
   */
  serializeExtras() {
    return {
      role: this.$extras.pivot_role,
    }
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @manyToMany(() => User, {
    pivotColumns: ['role', 'dictionaries'],
    pivotTimestamps: true,
  })
  declare users: ManyToMany<typeof User>
}
