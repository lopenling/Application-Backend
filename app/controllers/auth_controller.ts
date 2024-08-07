import User from '#models/user'
import UserToken from '#models/user_token'
import { LoginValidator, PasswordValidator, RegupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'
import { randomBytes } from 'node:crypto'

export default class AuthController {
  /**
   * Register new user
   */
  async register({ request }: HttpContext) {
    // Validate incoming request
    const validated = await request.validateUsing(RegupValidator)

    // Search by mail or create new with just mail
    const user = await User.firstOrCreate(
      {
        email: validated.email,
      },
      {
        email: validated.email,
        avatar: '',
      }
    )

    // Return only user default login method and email
    // We don't want to expose any more data about user
    return user.serialize({ fields: ['defaultLoginMethod', 'email'] })
  }

  /**
   * Send magic link to user email
   */
  async sendMagicLink({ request }: HttpContext) {
    // Validate incoming request
    const validated = await request.validateUsing(RegupValidator)

    // Find user
    const user = await User.findByOrFail('email', validated.email)

    // Create secure login token for user
    let token = await user.related('userTokens').create({
      token: randomBytes(40).toString('hex'),
      type: 'login',
      expiresAt: DateTime.now().plus({ days: 7 }),
    })

    // Add token to link, which will be emailed
    // @TODO: Make this dynamic
    const link = `https://my.lopenling.com/login/token?token=${token.token}`

    // Send email
    await mail.send((message) => {
      message
        .to(validated.email)
        .subject('Login to Lopenling')
        .htmlView('emails/verify_email', { link })
    })

    // If user hasn't selected default login method
    // Update it to current one, which is magic link
    if (!user.defaultLoginMethod) {
      user.defaultLoginMethod = 'magic_link'
      await user.save()
    }

    // Return back user email, to which mail was sent
    return user.serialize({ fields: ['email'] })
  }

  /**
   * Authenticate user based on token from magic link
   */
  async tokenAuth({ auth, request, response }: HttpContext) {
    // Find non-expired token
    const token = await UserToken.query()
      .where({
        token: request.input('token'),
      })
      .andWhere('expires_at', '>=', DateTime.now().toSQL())
      .first()

    if (!token) {
      return response.notFound('Token not found or expired')
    }

    // Authenticate user by token
    let user = await User.findOrFail(token.userId)
    await auth.use('web').login(user)

    // Get rid of old token
    await token.delete()

    return user
  }

  async setPassword({ auth, request, response }: HttpContext) {
    const validated = await request.validateUsing(PasswordValidator)

    const user = await User.findByOrFail('email', validated.email)
    if (user.defaultLoginMethod) {
      return response.forbidden(
        'Default login method already set, please log in to change your password'
      )
    }

    user.password = validated.password
    user.defaultLoginMethod = 'password'
    user.save()

    auth.use('web').login(user)

    return user
  }

  async login({ auth, request }: HttpContext) {
    const validated = await request.validateUsing(LoginValidator)
    const user = await User.verifyCredentials(validated.email, validated.password)

    if (validated.defaultToPassword) {
      user.defaultLoginMethod = 'password'
      await user.save()
    }

    await auth.use('web').login(user)

    return user
  }

  /**
   * Handle callbacks from social providers
   */
  async socialCallback({ ally, params, request, response, auth }: HttpContext) {
    const driverInstance = ally.use(params.provider)
    const authenticatingUrl = request.cookie('authenticating_url')
    response.clearCookie('authenticating_url')

    /**
     * User has denied access by canceling
     * the login flow
     */
    if (driverInstance.accessDenied()) {
      return 'You have cancelled the login process'
    }

    /**
     * OAuth state verification failed. This happens when the
     * CSRF cookie gets expired.
     */
    if (driverInstance.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again'
    }

    /**
     * Auth provider responded with some error
     */
    if (driverInstance.hasError()) {
      return driverInstance.getError()
    }

    /**
     * Access user info
     */
    const user = await driverInstance.user()

    /**
     * Store user to local DB
     */
    const localUser = await User.firstOrCreate({
      email: user.email
    }, {
      email: user.email,
      avatar: user.avatarUrl,
      firstName: user.original?.given_name,
      lastName: user.original?.family_name,
    })

    // In case user has been updated in any Social auths, then let's update it in our DB too
    await localUser.merge({
      avatar: user.avatarUrl,
      firstName: user.original?.given_name,
      lastName: user.original?.family_name,
    }).save()

    /**
     * Login user
     */
    await auth.use('web').login(localUser)

    /**
     * Redirect user to frontend redirect URL
     */
    return response.redirect(`${authenticatingUrl}login/callback`)
  }

  async logout({ auth }: HttpContext) {
    return auth.use('web').logout()
  }
}
