import { createTeamValidator } from '#validators/team'
import type { HttpContext } from '@adonisjs/core/http'

export default class TeamsController {
  async index({ auth }: HttpContext) {
    await auth.user?.load('teams')
    return auth.user?.teams
  }

  async store({ request, auth }: HttpContext) {
    const validated = await request.validateUsing(createTeamValidator)
    const team = await auth.user?.related('teams').create(
      {
        name: validated.name,
      },
      {
        role: 'admin',
      }
    )

    return team
  }
}
