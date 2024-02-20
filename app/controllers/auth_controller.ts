import User from '#models/user'
import { registerValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ auth, request, response }: HttpContext) {
    const email = request.input('email')

    // Check if first login, or existing user
    let user = await User.findBy('email', email)
    if (!user) {
      return response.notFound({
        message: 'User not found, signup first',
      })
    }

    // Existing user, deal with login flow

    return user
  }

  async register({ auth, request }: HttpContext) {
    const validated = await request.validateUsing(registerValidator)

    const user = await User.create(validated)

    return user
  }

  async logout({ auth }: HttpContext) {
    return 'OK'
  }
}
