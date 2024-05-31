import Dictionary from '#models/dictionary'
import { createDictionaryValidator, updateDictionaryValidator } from '#validators/dictionary'
import type { HttpContext } from '@adonisjs/core/http'

export default class DictionariesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Dictionary.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const validated = await request.validateUsing(createDictionaryValidator)

    return Dictionary.create(validated)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return Dictionary.findByOrFail(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const validated = await request.validateUsing(updateDictionaryValidator)
    const dictionary = await Dictionary.findOrFail(params.id)

    dictionary.name = validated.name

    await dictionary.save()

    return dictionary
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const dictionary = await Dictionary.findOrFail(params.id)
    return dictionary.delete()
  }
}