import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when updating
 * an existing dictionary.
 */
export const termSearchValidator = vine.compile(
  vine.object({
    term: vine.string().optional().requiredIfMissing('description'),
    description: vine.string().optional().requiredIfMissing('term'),
    dictionaries: vine.array(vine.number())
  })
)
