import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().unique(async (db, value) => {
      const user = await db.from('users').where('email', value).first()
      return !user
    }),
    defaultLoginMethod: vine.enum(['password', 'magic_link']).optional(),
    password: vine.string().optional(),
    password_repeat: vine.string().confirmed({ confirmationField: 'password' }).optional(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().exists((db, value) => {
      return db.from('users').where('email', value).first()
    }),
    defaultLoginMethod: vine.enum(['password', 'magic_link']).optional(),
  })
)

export const RegupValidator = vine.compile(
  vine.object({
    email: vine.string(),
    // defaultLoginMethod: vine.enum(['password', 'magic_link']).optional(),
  })
)

export const PasswordValidator = vine.compile(
  vine.object({
    email: vine.string().exists(async (db, value) => {
      return db.from('users').where('email', value).first()
    }),
    password: vine.string(),
    password_repeat: vine.string().confirmed({ confirmationField: 'password' }),
  })
)

export const LoginValidator = vine.compile(
  vine.object({
    email: vine.string().exists(async (db, value) => {
      return db.from('users').where('email', value).first()
    }),
    password: vine.string(),
    defaultToPassword: vine.boolean(),
  })
)
