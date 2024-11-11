import { createTeamValidator, updateTeamValidator } from '#validators/team'
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
   * Get user own team by ID
   */
  async show({ auth, params }: HttpContext) {

    return auth.user!.related('teams').query()
      .where('id', params.id)
      .preload('users', (query) => {
        query.pivotColumns(['role'])
      })
      .firstOrFail()
  }


  /**
   * Leave team
   */
  async leave({ auth, params }: HttpContext) {
    return auth.user!.related('teams').detach([params.id])
  }

  /**
   * Update team. Currently only name can be updated
   */
  async patch({ auth, params, request }: HttpContext) {
    const validated = await request.validateUsing(updateTeamValidator)

    // Allow updating only teams, where user is admin
    const team = await auth.user!.related('teams').query()
      .where('id', params.id)
      .wherePivot('role', 'admin')
      .firstOrFail()

    team.merge(validated)
    await team.save()

    return team
  }
}
