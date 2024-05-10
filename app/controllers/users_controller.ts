import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Get currently logged in user
   */
  async me({ auth }: HttpContext) {
    return auth.user
  }
}
