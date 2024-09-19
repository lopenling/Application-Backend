import { createTeamValidator } from '#validators/team'
import type { HttpContext } from '@adonisjs/core/http'

export default class TeamsController {
  /**
   * List all user teams
   */
  async index({ auth }: HttpContext) {
    await auth.user!.load('teams')
    return auth.user!.teams
  }

  /**
   * Create new team
   */
  async store({ request, auth }: HttpContext) {
    const validated = await request.validateUsing(createTeamValidator)
    const team = await auth.user!.related('teams').create(
      {
        name: validated.name,
      },
      {
        role: 'admin',
      }
    )

    return team
  }

  /**
   * Leave team
   */
  async leave({ auth, params }: HttpContext) {
    return auth.user!.related('teams').detach([params.id])
  }
}
