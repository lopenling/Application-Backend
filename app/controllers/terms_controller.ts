import Term from '#models/term'
import { termSearchValidator } from '#validators/term'
import type { HttpContext } from '@adonisjs/core/http'
import { wylie } from 'tibetan'


export default class TermsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async search({ request }: HttpContext) {
    const validated = await request.validateUsing(termSearchValidator)

    // Search by term
    if (validated.term) {
      return Term.query()
        .whereIn('dictionary_id', validated.dictionaries)
        .whereLike('term', `%${wylie.fromWylie(validated.term)}%`)
    }

    // Search by description
    return Term.query()
      .whereIn('dictionary_id', validated.dictionaries)
      .whereLike('description', `%${validated.description}%`)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
