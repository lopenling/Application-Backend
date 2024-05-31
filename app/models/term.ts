import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Term extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare dictionary_id: number
  
  @column()
  declare term: string

  @column()
  declare description: string
}