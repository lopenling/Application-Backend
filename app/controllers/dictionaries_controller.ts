import Dictionary from '#models/dictionary'
import Term from '#models/term'
import { createDictionaryValidator, updateDictionaryValidator } from '#validators/dictionary'
import type { HttpContext } from '@adonisjs/core/http'

import db from '@adonisjs/lucid/services/db'

import  fs from 'fs'
import  readline from 'readline'

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

    const dictionary = await Dictionary.create({
      name: validated.name
    })

    const fileStream = fs.createReadStream(validated.dictionary.tmpPath!);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    const insertData: Partial<Term>[] = []


    for await (const line of rl) {
      const [term, description] = line.split('\t')
      if (term === 'Tibetan') {
        continue;
      }

      insertData.push({
        dictionary_id: dictionary.id,
        term,
        description
      })
    }

    const chunkSize = 10000;
    for (let i = 0; i < insertData.length; i += chunkSize) {
        const chunk = insertData.slice(i, i + chunkSize);
        await db.insertQuery()
          .table('terms')
          .multiInsert(chunk)
    }

    return 'OK'
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
