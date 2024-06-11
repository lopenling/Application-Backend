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

    let query = Term.query()
    .whereIn('dictionary_id', validated.dictionaries)

    // Search by term
    if (validated.term) {
      if (validated.matching === 'exact') {
        query.where('term', wylie.fromWylie(validated.term))
      } else {
        query.whereLike('term', `%${wylie.fromWylie(validated.term)}%`)
      }

      return query
    }

    if (validated.matching === 'exact') {
      query.where('description', wylie.fromWylie(validated.description))
    } else {
      query.whereLike('description', `%${wylie.fromWylie(validated.description)}%`)
    }

    return query
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
