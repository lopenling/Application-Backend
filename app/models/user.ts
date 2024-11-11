import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, computed, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import UserToken from './user_token.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Team from './team.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  /**
   * Serialize only specific fields from pivot table
   */
  serializeExtras() {
    return {
      role: this.$extras.pivot_role,
    }
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @computed()
  get fullName() {
    return [this.firstName, this.lastName].filter(Boolean).join(' ')
  }

  @column()
  declare avatar: string | null

  @column()
  declare defaultLoginMethod: 'magic_link' | 'password' | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => UserToken)
  declare userTokens: HasMany<typeof UserToken>

  @manyToMany(() => Team, {
    pivotColumns: ['role'],
    pivotTimestamps: true,
  })
  declare teams: ManyToMany<typeof Team>
}
