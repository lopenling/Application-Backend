import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new dictionary.
 */
export const createDictionaryValidator = vine.compile(
  vine.object({
    name: vine.string()
  })
)

/**
 * Validator to validate the payload when updating
 * an existing dictionary.
 */
export const updateDictionaryValidator = vine.compile(
  vine.object({
    name: vine.string()
  })
)