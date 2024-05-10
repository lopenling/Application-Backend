import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new team.
 */
export const createTeamValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing team.
 */
export const updateTeamValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)
